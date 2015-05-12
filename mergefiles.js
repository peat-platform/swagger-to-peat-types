var merge = require('merge')
var fs    = require('fs')

var file1 = require('./pass1.json')
var file2 = require('./pass2.json')
var file3 = require('./pass3.json')


var m = merge(file1, file2)

m = merge(file2, file3)

function sortObject(o) {
   var sorted = {},
      key, a = [];

   for (key in o) {
      if (o.hasOwnProperty(key)) {
         a.push(key);
      }
   }

   a.sort();

   for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
   }
   return sorted;
}

var toSpace = function(str){
   return str.replace(/[a-z]([A-Z]{1})/g, function($1){
      //var parts = $1.split();
      return $1.charAt(0) + " " + $1.charAt(1)});
};


for (var i in m){
   var s   = toSpace(i)
   var val = m[i]
   delete m[i]
   m[s]    = val
}

m = sortObject(m)



fs.writeFile("combined.json", JSON.stringify(m, null, '\t'), function(err) {
   if(err) {
      console.log("Error: ", err);
   } else {
      //console.log("The output was saved to file: " + out);
   }
});