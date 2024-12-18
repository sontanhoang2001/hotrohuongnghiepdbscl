"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          account_type: 0,
          email: "admin@gmail.com",
          phone: '19001087',
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          authCode: null,
          roleId: 1,
          status: 1,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          account_type: 0,
          email: "user@gmail.com",
          phone: '0973827831',
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          authCode: null,
          roleId: 5,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
       
        {account_type:0,email:"mbrushneen2@flickr.com",phone:"232-441-1877",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"sidill3@loc.gov",phone:"964-965-8274",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"wanetts4@yale.edu",phone:"808-329-6052",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ohanrott5@dell.com",phone:"626-630-0058",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"fbroun6@google.com",phone:"889-903-8667",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"aeastabrook7@arizona.edu",phone:"461-684-6056",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"bottiwill8@newsvine.com",phone:"785-362-0079",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"sstrickett9@linkedin.com",phone:"690-312-0548",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"kpulmana@sourceforge.net",phone:"455-315-3994",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"cbuskeb@live.com",phone:"907-974-2167",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"chartusc@webmd.com",phone:"181-955-9871",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ktoffolod@senate.gov",phone:"990-559-2243",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"gtybalte@webnode.com",phone:"304-350-6713",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"gmanonf@arstechnica.com",phone:"883-158-5288",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"gsamplesg@yelp.com",phone:"856-982-9281",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"etenbrugh@bizjournals.com",phone:"611-375-0214",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ssabathei@so-net.ne.jp",phone:"126-528-1334",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"kfinnanj@amazonaws.com",phone:"401-890-7493",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"smcgowingk@mapquest.com",phone:"600-406-2451",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"mcrightonl@csmonitor.com",phone:"612-617-4869",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"nverrillsm@domainmarket.com",phone:"195-855-1060",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ncareyn@wordpress.org",phone:"206-274-9994",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"scarmano@php.net",phone:"301-691-1727",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"spapap@amazonaws.com",phone:"691-183-4792",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"hdelgardilloq@marketwatch.com",phone:"952-137-4380",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"agrevelr@icio.us",phone:"753-638-3190",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"telans@mtv.com",phone:"314-859-4939",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"bchilest@godaddy.com",phone:"675-510-5703",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"dbarru@sitemeter.com",phone:"882-645-4439",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"abowlesv@mac.com",phone:"122-733-1807",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ecelezw@blogger.com",phone:"419-458-1987",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"mgalegox@rambler.ru",phone:"368-151-4685",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"gromanety@usa.gov",phone:"763-380-4577",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"amacveighz@timesonline.co.uk",phone:"667-624-5066",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"kmansfield10@shutterfly.com",phone:"787-736-1335",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"scapps11@globo.com",phone:"292-209-7713",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"mmancer12@dagondesign.com",phone:"212-105-4834",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"vstokes13@ucoz.ru",phone:"420-262-6718",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"jbroomfield14@irs.gov",phone:"884-872-3509",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"cbriscow15@apache.org",phone:"341-343-2579",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"jjeff16@nba.com",phone:"733-763-4661",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"thaldene17@washingtonpost.com",phone:"268-160-6695",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ekeets18@yale.edu",phone:"679-842-3466",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"afackney19@devhub.com",phone:"742-518-4780",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ckynder1a@deviantart.com",phone:"913-198-9204",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"hmatschke1b@themeforest.net",phone:"565-388-3894",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"eosborne1c@facebook.com",phone:"625-305-7846",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"rwasiela1d@wix.com",phone:"364-733-6003",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"mdeath1e@zimbio.com",phone:"287-111-1173",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"nkilleen1f@symantec.com",phone:"700-141-2837",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"kwhitwood1g@spiegel.de",phone:"262-954-5362",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"dkarlqvist1h@zimbio.com",phone:"212-128-0648",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"jdebnam1i@google.nl",phone:"375-272-1239",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ocalley1j@ebay.co.uk",phone:"506-884-8954",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ahounsome1k@prweb.com",phone:"600-312-0444",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"kbedford1l@usa.gov",phone:"895-348-3345",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"pjancar1m@gnu.org",phone:"790-532-5391",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"jsuthren1n@angelfire.com",phone:"763-412-2151",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"aforson1o@ezinearticles.com",phone:"263-352-1858",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"greckless1p@tinypic.com",phone:"192-627-2296",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"hvercruysse1q@addthis.com",phone:"152-591-7688",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"gdodell1r@nytimes.com",phone:"350-722-1626",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"kcodman1s@issuu.com",phone:"171-562-5785",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"kmcvey1t@ed.gov",phone:"754-445-8405",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"dstirrip1u@yahoo.com",phone:"836-878-8969",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"wfrude1v@elegantthemes.com",phone:"896-353-9642",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"bkobu1w@phpbb.com",phone:"107-343-9464",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"dmartijn1x@a8.net",phone:"786-894-0378",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"nswains1y@163.com",phone:"606-258-8974",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ahollow1z@goodreads.com",phone:"103-955-8956",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"bdebeauchamp20@jalbum.net",phone:"431-232-6606",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"wcabotto21@wikimedia.org",phone:"483-271-0605",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"kblindt22@independent.co.uk",phone:"502-655-2650",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ddruery23@drupal.org",phone:"951-639-7014",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"tscoular24@goodreads.com",phone:"397-679-1646",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"scrosthwaite25@cafepress.com",phone:"970-382-0921",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"kmaccarter26@hp.com",phone:"273-467-4519",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"dhaysey27@yale.edu",phone:"687-420-7674",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"csparwell28@github.io",phone:"505-695-8993",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"agodleman29@fda.gov",phone:"686-120-8008",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ttomadoni2a@joomla.org",phone:"236-997-4619",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"cbreche2b@cafepress.com",phone:"459-668-7116",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"kdury2c@cyberchimps.com",phone:"662-255-5990",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"cbaldinotti2d@google.pl",phone:"304-641-7983",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"lbaumber2e@archive.org",phone:"890-919-1347",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ehaylands2f@wisc.edu",phone:"447-563-8666",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"sclappison2g@altervista.org",phone:"551-345-9105",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"agentiry2h@columbia.edu",phone:"104-772-6825",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"habrehart2i@flavors.me",phone:"216-725-6745",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"egatward2j@bluehost.com",phone:"288-422-5786",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"klosemann2k@networkadvertising.org",phone:"172-287-5855",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"jhotton2l@exblog.jp",phone:"870-507-1718",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:5,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"rpickaver2m@feedburner.com",phone:"469-906-1690",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"cstuchbery2n@ocn.ne.jp",phone:"575-698-9688",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"ofellgate2o@people.com.cn",phone:"941-841-8225",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:2,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"ckeysel2p@archive.org",phone:"992-908-4374",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:1,status:0, createdAt: new Date(), updatedAt: new Date()},
        {account_type:1,email:"alowell2q@examiner.com",phone:"394-101-4273",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:3,status:1, createdAt: new Date(), updatedAt: new Date()},
        {account_type:0,email:"bjobin2r@salon.com",phone:"397-963-4097",password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",authCode:null,roleId:4,status:0, createdAt: new Date(), updatedAt: new Date()},

      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};