Swagger to OPENi types
======================

This module created OPENi types from the specified swagger resource file.

* By default only models associated with PUT and POST actions are created. The -a flag overrides this and creates all.

* A file is created which maps the endpoint and the action to the type id in the OPENi platform. 


Options
=========

Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -s, --swagger [value]       Link to root Swagger resource.
    -o, --openi_server [value]  OPENi server where the types are to be created.
    -f, --file_output [value]   File where output is written to.
    -a, --all                   If specified all Swagger Models are created, otherwise just models associated with PUT operations are created.




Samples
=========

node main.js -s https://dev.openi-ict.eu/api-spec/v1/api_framework -o dev.openi-ict.eu -f out.json

```json
{"Badge":{"Badge_post":"t_4b0ad9935d57b6f2c3f926042b06f040-1092","Badge_put":"t_157d871654ee9af108eda9e5cd82a2b3-1091"},"Card":{"Card_post":"t_395bb8347285025d08c9335a367cae85-1425","Card_put":"t_7fe41665d8eca26a250ccd50377dc5ce-1424"},"Account":{"Account_post":"t_a5ab2396509c5038330b0aaade4e51ba-1659","Account_put":"t_cea91e211e80aa27de6eca6d238064d7-1658"},"Audio":{"Audio_post":"t_b953cf39bf551cb82bf738868bfe3a99-1187","Audio_put":"t_ce0525188be6c9816054a1f424173365-1186"},"Application":{"Application_post":"t_ca58edf5fdc548c6806f96aecbae743e-995","Application_put":"t_9eaac680e28f44088f676f3f2c6d11c0-994"},"Article":{"Article_put":"t_b1618f7af15e1ffb57cecfeddea46aaf-1188","Article_post":"t_1104decd7d6031a5851b53e7f5ae3135-1189"},"Checkin":{"Checkin_post":"t_612c983e7ad264ee09d8267f6c1dd7dd-854","Checkin_put":"t_a5c24b3b7766e0511a970fd91acca8b4-853"},"Contact":{"Contact_post":"t_068803d25f7fe6ade1f8e0657ea68f34-636","Contact_put":"t_a9f3fdf93b847d95fd55112755f2dbac-635"},"Context":{"Context_put":"t_ab88034769e77d4e8b62d40c90bba3ee-9176"},"Device":{"Device_put":"t_54e503058588cd0d4883d8b244504889-749","Device_post":"t_2600f8b04761cc696704278d31185492-750"},"Event":{"Event_post":"t_ab2d006b6bf640ed1111973d41ba3d8a-1211","Event_put":"t_61d85a4bc97ae77e3c8c059262d52adb-1210"},"Game":{"Game_post":"t_b273f3b072c0f8404287e55603aa3890-1210","Game_put":"t_691742472256f3f69d99fa16b00b321a-1209"},"File":{"File_post":"t_bdb506f8575bea180ca01921d23b9f88-1186","File_put":"t_aee2b4ee1560b90caf6064b149db0f31-1185"},"Measurement":{"Measurement_post":"t_d12a16607e3be852b84117f1629dd316-1195","Measurement_put":"t_92931e1efd0a1c0f2f65f68f7508b332-1194"},"Note":{"Note_post":"t_cd635fcc2984673c407af57d1a125dc6-962","Note_put":"t_f1480399ff7f17ddf78a485dd0905c77-961"},"Nutrition":{"Nutrition_post":"t_df0422eba3bc885dbd511c1cbbe29913-1419","Nutrition_put":"t_05d5da1c51441635e733e5807fad6751-1418"},"Order":{"Order_post":"t_691a1bebab06514c4b96f287d859609b-1102","Order_put":"t_234a6dd5016e157850a35f83479459e3-1101"},"Photo":{"Photo_post":"t_5438af1659b6d5f3690fbad1fa0a3ab6-1308","Photo_put":"t_1e34d8f86f42ee476ba414696dc52315-1307"},"Place":{"Place_post":"t_1efe4ce37f901ab2138ec2dab4ad25ed-1211","Place_put":"t_08d2718ab0ced47940f0eff8589a49dc-1210"},"Question":{"Question_post":"t_0eff951d4e85ef1e2e2facc3418da481-1101","Question_put":"t_4a47aa0ef796d0f3912f9d137138ffe7-1100"},"Product":{"Product_post":"t_937f0787277afc83665864a0b9000044-1201","Product_put":"t_cef7ef292ec74e3bbf658bf2cf98ef21-1200"},"Registeredapplication":{"Registeredapplication_post":"t_c8f81a833e83f355b74e146f762c0e59-305","Registeredapplication_put":"t_1da3e13367758eaedd3381521a6cfe25-304"},"Route":{"Route_put":"t_8e9724bdaaba09a48dba250cf530aa62-1210","Route_post":"t_195a40c522f82ae27d726c57d6eb0d01-1211"},"Shop":{"Shop_post":"t_eedb6027dda05adc6255571f80265b4e-1097","Shop_put":"t_4bd2f7e02eb5a72a4a007a6096148486-1096"},"Service":{"Service_post":"t_b2abac774b2004ad7e9acba4c90c3f9d-1092","Service_put":"t_05aead7d5708ba3eaf7f711d06373820-1091"},"Sleep":{"Sleep_post":"t_aab197c5dccb9f7b384e91e26482548b-1312","Sleep_put":"t_fdcb224d18ae8292381c1e1f426de02d-1311"},"SocialAccount":{"SocialAccount_post":"t_8cd0e43f1aa3533c51d38ca8e05f1495-662","SocialAccount_put":"t_b05e369293f73f10ef4452f7d15e64b7-661"},"Socialapp":{"Socialapp_post":"t_8b2a294857480dcc7a1185d7c8b178c5-634","Socialapp_put":"t_d2e72317df18969d98106c3ee419bd1f-633"},"SocialToken":{"SocialToken_post":"t_05ee371177db67fbb9a7c8fdc6f677b3-428","SocialToken_put":"t_24fd8576a6b7bdaba260e8364f310b5f-427"},"Status":{"Status_post":"t_ade7eb9cd67ecc8c8bfdae3a698f730f-964","Status_put":"t_57635aa62dd995457cf296cf730ee52a-963"},"User":{"User_post":"t_0c9558878fcf6221723ff6d277319bfd-1372","User_put":"t_2b74aa6742a3216a931605f54e2367c6-1371"},"Workout":{"Workout_post":"t_627b43e262a85c4ac28f6b7e2536e314-1566","Workout_put":"t_fdb995b08435f8ac0adffc1b147cad99-1565"},"Video":{"Video_post":"t_a55f1781beff699b893e8490679db54b-1187","Video_put":"t_38f2982c23b8b0dbd43a3da5e40f1899-1186"}}

```

node main.js -s http://petstore.swagger.wordnik.com/api/api-docs -o dev.openi-ict.eu -f out.json -a
