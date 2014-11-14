var argv  = require('commander')
var http  = require('http')
var https = require('https')
var fs    = require('fs');
var async = require('async')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

argv.version('0.0.2')
   .option('-s, --swagger [value]',      'Link to root Swagger resource.')
   .option('-o, --openi_server [value]', 'OPENi server where the types are to be created.')
   .option('-f, --file_output [value]',  'File where output is written to.')
   .option('-m, --mapping [value]',      'JSON object that maps related objects to OPENi Type ids.')
   .option('-g  --models [value]',       'Only create types for models within this array')
   .option('-a, --all',                  'If specified all Swagger Models are created, otherwise just models associated with PUT operations are created.')
   .on('--help', function(){
      console.log('  Examples:');
      console.log('');
      console.log('    node main.js -s https://dev.openi-ict.eu/api-spec/v1/api_framework -o dev.openi-ict.eu -f out.json');
      console.log('');
   })
   .parse(process.argv);


if (!argv.swagger || !argv.openi_server || !argv.file_output){
   console.log('');
   console.log('\033[91m Error: Missing parameters\033[0m');
   console.log('');
   argv.help()
   return
}

var swagger                = argv.swagger
var server                 = argv.openi_server
var out                    = argv.file_output
var modelsToProcess        = (argv.models)  ? JSON.parse(argv.models)  : []
var mapping                = (argv.mapping) ? JSON.parse(argv.mapping) : {}
var o = {}


var url_action = (0 === swagger.indexOf('https://')) ?  https : http

var writeData = function (){
   fs.writeFile(out, JSON.stringify(o), function(err) {
      if(err) {
         console.log("Error: ", err);
      } else {
         //console.log("The output was saved to file: " + out);
      }
   });
}

var getData = function(url, success, callback){

   url_action.get(url, function(res) {
      var data = ""
      res.on("data", function(chunk) {
         data+=chunk
      });
      res.on('end', function() {
         try{
            success(JSON.parse(data), callback)
         }
         catch (e){
            if (301 === res.statusCode){
               getData(res.headers.location, success, callback)
               return
            }
            console.log("Error parsing url: ", url)
            console.log("Error message: ", e)
         }
      });
   }).on('error', function(e) {
      console.log("Got error: " + e.message);
   });
}

var typeTranslator = function(swagger_type, swagger_name){

   if ( undefined !== swagger_type["$ref"] ){
      console.log(">>>", swagger_type["$ref"])
      return "string";
   }

   if ('url' == swagger_name.toLowerCase()){
      return 'url'
   }

   switch (swagger_type.type.toLowerCase()){
   case "integer":
   case "int":
      return "int"
      break
   case "string":
      return "string"
      break
   case "boolean":
      return "boolean"
      break
   case "date":
      return "date"
      break
   case "related":
      //console.log(swagger_type, swagger_name)
      var typeId = mapping[swagger_name]
      //console.log("related", typeId)
      if (undefined !== typeId){
         return typeId
      }
      else{
         console.log("Could not fnd related", swagger_type, swagger_name)
      }
      return "string"
      break
   default :
      return "string"
      break
   }
}


var createType = function(endpointData, model_name, type, callback){


   if (undefined === o[endpointData]){
      o[endpointData] = {}
   }

   var options = {
      host: server,
      port: 443,
      path: '/api/v1/types',
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Accept-Encoding':'gzip,deflate',
         'Content-Length': Buffer.byteLength(type),
         'Connection': 'keep-alive',
         "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36"
      }
   };

   var req = https.request(options, function(res){
      var data = ''

      res.setEncoding('utf8');
      res.on('data', function(chunk){
         data += chunk;
      });
      res.on('end', function(){
      
         if(undefined === data || "" === data){
         	return
         }
         if (JSON.parse(data)['@id']){
            o[endpointData][model_name] = JSON.parse(data)['@id']
         }
         else{
            var id = data.replace("{\"error\":\"Error adding entity: OPENi Type already exists (", "")
            var id = id.replace(").\"}", "")
            o[endpointData][model_name] = id
         }
         writeData()
         //callback(null)
      });
   });

   req.on('error', function(e) {
      console.log('problem with request: ' + e.message, model_name, endpointData, type);
   });

   req.write(type);
   req.end();
}


var processEndpoint = function(endpointData, callback){

   var models = {}

   if (argv.all){
      models = endpointData.models
   }
   else{
      //create models for POST models only
      for (var i = 0; i < endpointData.apis.length; i++){
         for (var j = 0; j < endpointData.apis[i].operations.length; j++){
            var operation = endpointData.apis[i].operations[j]

            var method = operation.method

            if (undefined === method){
               method = operation.httpMethod
            }

            if ('POST' === method){

               for (var k = 0; k < operation.parameters.length; k++){
                  if ('body' === operation.parameters[k].paramType.toLowerCase()){
                     var type = operation.parameters[k].type
                     if (undefined === type){
                        type = operation.parameters[k].dataType
                     }

                     if ('array' === type.toLowerCase()){
                        type = operation.parameters[k]["items"]["$ref"]
                     }

                     models[type] = endpointData.models[type]
                  }
               }
            }
         }
      }
   }



   for ( model in models){

      if ( 0 !== modelsToProcess.length && -1 === modelsToProcess.indexOf(model)){
         continue
      }

      var model_name  = model
      var model_value = endpointData.models[model]

      var host_root = swagger.split('/')[0] + "//" +  swagger.split('/')[2]

      var openiType = {"@context": [], "@reference" : host_root + '/' +  model_name}

      var counter   = 0

      for (prop in model_value.properties){

         var prop_value = model_value.properties[prop]

         openiType["@context"][counter] = {}

         openiType["@context"][counter]["@property_name"]    = prop
         openiType["@context"][counter]["@openi_type"]       = typeTranslator(prop_value, prop)
         openiType["@context"][counter]["@multiple"]         = false
         openiType["@context"][counter]["@required"]         = false
         openiType["@context"][counter]["@context_id"]       = host_root + '/' +  model_name + '/' + prop
         counter++
      }

      createType(endpointData.resourcePath.replace("/", ""), model_name, JSON.stringify(openiType), callback)
   }

}


var isValidURL = function(str) {
   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
   if(!pattern.test(str)) {;
      return false;
   } else {
      return true;
   }
}


getData(swagger, function(swagger_root){

   var processAPI = function(api, err){
      var endpoint = api.path.replace('{format}', 'json')

      if (!isValidURL(endpoint)){
         var base = swagger.substr(0, swagger.lastIndexOf('/'))
         var end  = swagger.substr(swagger.lastIndexOf('/'), swagger.length)
         if ( -1 !== end.indexOf('.')){
            endpoint = base + endpoint
         }
         else{
            endpoint = swagger + endpoint
         }
      }

      getData( endpoint, processEndpoint, err)
   }

   async.each(swagger_root.apis, processAPI, function(err){
      writeData()
   });

}, false)





