'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Detail',
      [
        {
          fullName: 'Nguyen Minh Nhut',
          gender: '1',
          avatar: 'https://media.licdn.com/dms/image/C4E03AQEmIVL2LZyMmA/profile-displayphoto-shrink_200_200/0/1604397377631?e=1698883200&v=beta&t=tOpg8aUYYaQWYC5fxm3arrWLunBBULdQOD_W7aKjxxc',
          birthday: '2023-10-10',
          address: 'Can tho',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: 'Nguyễn Thị B',
          gender: '2',
          avatar: 'https://media.licdn.com/dms/image/C4E03AQEmIVL2LZyMmA/profile-displayphoto-shrink_200_200/0/1604397377631?e=1698883200&v=beta&t=tOpg8aUYYaQWYC5fxm3arrWLunBBULdQOD_W7aKjxxc',
          birthday: '2023-10-10',
          address: 'Cần Thơ',
          addressDetail: 'Ea incididunt adipisicing amet nisi mollit sunt.',
          userId: 2,
          createdAt: new Date(), updatedAt: new Date()
        },

{"fullName":"Gaven Hitscher","gender":2,"avatar":"https://robohash.org/sitporroperferendis.png?size=50x50&set=set1","birthday":"2001-10-29","address":"3 Pleasure Circle","addressDetail":"Room 625","userId":3, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Neile Limon","gender":2,"avatar":"https://robohash.org/nonrerumomnis.png?size=50x50&set=set1","birthday":"2003-06-02","address":"50767 Donald Street","addressDetail":"Apt 1824","userId":4, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Giacobo Plan","gender":0,"avatar":"https://robohash.org/nisisuscipitest.png?size=50x50&set=set1","birthday":"2003-05-06","address":"15 Crowley Road","addressDetail":"Apt 228","userId":5, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Elisabet Ghion","gender":1,"avatar":"https://robohash.org/autemlaudantiumfacere.png?size=50x50&set=set1","birthday":"2003-03-17","address":"5 Main Point","addressDetail":"10th Floor","userId":6, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Giovanni Merring","gender":2,"avatar":"https://robohash.org/omniseumratione.png?size=50x50&set=set1","birthday":"2003-09-11","address":"5065 Killdeer Point","addressDetail":"Suite 33","userId":7, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Melodie Blowes","gender":2,"avatar":"https://robohash.org/velitetquibusdam.png?size=50x50&set=set1","birthday":"2002-06-01","address":"079 Utah Road","addressDetail":"3rd Floor","userId":8, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Fredric Exell","gender":0,"avatar":"https://robohash.org/fugaquisaccusantium.png?size=50x50&set=set1","birthday":"2003-07-08","address":"46915 Westerfield Crossing","addressDetail":"Suite 97","userId":9, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Lilia Fouracre","gender":0,"avatar":"https://robohash.org/namomnispossimus.png?size=50x50&set=set1","birthday":"2004-03-01","address":"8 Garrison Way","addressDetail":"Room 278","userId":10, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Emmery Petters","gender":1,"avatar":"https://robohash.org/repellendusvoluptatemin.png?size=50x50&set=set1","birthday":"2000-12-13","address":"77149 Crownhardt Alley","addressDetail":"15th Floor","userId":11, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Bil Larvor","gender":0,"avatar":"https://robohash.org/beataesequiid.png?size=50x50&set=set1","birthday":"2002-04-18","address":"1986 Dottie Parkway","addressDetail":"12th Floor","userId":12, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Constance Lovejoy","gender":1,"avatar":"https://robohash.org/eosutprovident.png?size=50x50&set=set1","birthday":"2004-11-21","address":"1 Kennedy Pass","addressDetail":"PO Box 26437","userId":13, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Linnell Blandford","gender":1,"avatar":"https://robohash.org/ipsanihilodio.png?size=50x50&set=set1","birthday":"2004-07-10","address":"65608 Dwight Point","addressDetail":"Suite 94","userId":14, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Rafe Amyes","gender":0,"avatar":"https://robohash.org/utsaepehic.png?size=50x50&set=set1","birthday":"2002-07-20","address":"928 Commercial Trail","addressDetail":"Suite 90","userId":15, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Gwynne Thyng","gender":1,"avatar":"https://robohash.org/liberositvoluptates.png?size=50x50&set=set1","birthday":"2000-05-18","address":"94 Judy Terrace","addressDetail":"Room 465","userId":16, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Drugi Hens","gender":1,"avatar":"https://robohash.org/etomnisimpedit.png?size=50x50&set=set1","birthday":"2004-01-24","address":"2085 Forest Dale Center","addressDetail":"Apt 1287","userId":17, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Mariam Ludlom","gender":1,"avatar":"https://robohash.org/idinventoreab.png?size=50x50&set=set1","birthday":"2001-09-22","address":"5 Sommers Drive","addressDetail":"4th Floor","userId":18, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Truman Stollhofer","gender":1,"avatar":"https://robohash.org/voluptatemsitea.png?size=50x50&set=set1","birthday":"2000-10-27","address":"68 Golden Leaf Crossing","addressDetail":"Room 318","userId":19, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Edie Sedge","gender":1,"avatar":"https://robohash.org/etvoluptasconsequatur.png?size=50x50&set=set1","birthday":"2002-04-17","address":"860 Hagan Crossing","addressDetail":"Suite 29","userId":20, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Amitie Trawin","gender":0,"avatar":"https://robohash.org/enimmollitiaipsam.png?size=50x50&set=set1","birthday":"2003-04-08","address":"72 Trailsway Circle","addressDetail":"3rd Floor","userId":21, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Carmon Gallegos","gender":2,"avatar":"https://robohash.org/nisivoluptasvoluptas.png?size=50x50&set=set1","birthday":"2001-08-08","address":"3406 New Castle Junction","addressDetail":"Suite 11","userId":22, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Emmaline Aldrich","gender":2,"avatar":"https://robohash.org/facerequampraesentium.png?size=50x50&set=set1","birthday":"2002-12-05","address":"376 Debs Terrace","addressDetail":"Room 1777","userId":23, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Murry Tyrie","gender":1,"avatar":"https://robohash.org/involuptaseius.png?size=50x50&set=set1","birthday":"2002-06-02","address":"432 Carioca Parkway","addressDetail":"Apt 84","userId":24, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Standford de Chastelain","gender":0,"avatar":"https://robohash.org/nullaadipisciminima.png?size=50x50&set=set1","birthday":"2004-03-18","address":"1382 Hagan Junction","addressDetail":"17th Floor","userId":25, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Barty Spong","gender":2,"avatar":"https://robohash.org/reprehenderitharumvoluptatem.png?size=50x50&set=set1","birthday":"2000-09-22","address":"59 Farragut Avenue","addressDetail":"Apt 941","userId":26, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Pincas Avarne","gender":2,"avatar":"https://robohash.org/commodiodiovoluptatibus.png?size=50x50&set=set1","birthday":"2000-02-24","address":"369 Brentwood Place","addressDetail":"Apt 599","userId":27, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Gonzalo Chown","gender":2,"avatar":"https://robohash.org/repudiandaevoluptasdolorem.png?size=50x50&set=set1","birthday":"2003-05-04","address":"3386 Victoria Road","addressDetail":"Apt 857","userId":28, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Reina Alexandersson","gender":0,"avatar":"https://robohash.org/atquedolorsequi.png?size=50x50&set=set1","birthday":"2001-06-27","address":"8947 Garrison Point","addressDetail":"PO Box 56822","userId":29, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Debra Stappard","gender":1,"avatar":"https://robohash.org/suscipitdoloresmolestias.png?size=50x50&set=set1","birthday":"2003-03-19","address":"36 Manitowish Pass","addressDetail":"2nd Floor","userId":30, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Mora Riep","gender":2,"avatar":"https://robohash.org/adilloat.png?size=50x50&set=set1","birthday":"2004-07-13","address":"573 Schmedeman Crossing","addressDetail":"12th Floor","userId":31, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Fanni Grummitt","gender":2,"avatar":"https://robohash.org/dolorecorporismagnam.png?size=50x50&set=set1","birthday":"2000-04-06","address":"57 Fairview Trail","addressDetail":"Apt 940","userId":32, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Kate Rate","gender":0,"avatar":"https://robohash.org/etomnisperspiciatis.png?size=50x50&set=set1","birthday":"2000-11-24","address":"57 Schurz Alley","addressDetail":"PO Box 52078","userId":33, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Milo Andreone","gender":0,"avatar":"https://robohash.org/veniamsapienteiure.png?size=50x50&set=set1","birthday":"2001-06-20","address":"6735 Carpenter Pass","addressDetail":"Apt 1650","userId":34, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Lorne Maryan","gender":1,"avatar":"https://robohash.org/etquisquamvoluptas.png?size=50x50&set=set1","birthday":"2002-10-19","address":"09 Sommers Alley","addressDetail":"Room 1758","userId":35, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Ashil Dollimore","gender":2,"avatar":"https://robohash.org/consequunturdolorestempora.png?size=50x50&set=set1","birthday":"2004-02-27","address":"49 Nelson Junction","addressDetail":"Room 141","userId":36, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Marylinda Hovell","gender":0,"avatar":"https://robohash.org/voluptatenatusvoluptatem.png?size=50x50&set=set1","birthday":"2002-02-01","address":"6 Westerfield Plaza","addressDetail":"Suite 58","userId":37, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Sal Kauffman","gender":1,"avatar":"https://robohash.org/quidoloresmaxime.png?size=50x50&set=set1","birthday":"2003-12-10","address":"45236 Scoville Lane","addressDetail":"3rd Floor","userId":38, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Ethyl Tatersale","gender":1,"avatar":"https://robohash.org/solutaatempore.png?size=50x50&set=set1","birthday":"2004-12-23","address":"917 Cascade Drive","addressDetail":"Apt 1070","userId":39, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Jeanelle Corthes","gender":2,"avatar":"https://robohash.org/itaqueautprovident.png?size=50x50&set=set1","birthday":"2004-11-19","address":"718 Jay Road","addressDetail":"17th Floor","userId":40, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Reilly Castagno","gender":2,"avatar":"https://robohash.org/reiciendistemporibussit.png?size=50x50&set=set1","birthday":"2003-09-10","address":"9237 Eliot Road","addressDetail":"7th Floor","userId":41, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Nicolina Cadle","gender":0,"avatar":"https://robohash.org/rerumautin.png?size=50x50&set=set1","birthday":"2003-09-17","address":"91 Rusk Place","addressDetail":"Apt 443","userId":42, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Juanita Swiffin","gender":2,"avatar":"https://robohash.org/utsapientenihil.png?size=50x50&set=set1","birthday":"2001-05-04","address":"6 Cordelia Junction","addressDetail":"Suite 16","userId":43, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Gusella Mahody","gender":0,"avatar":"https://robohash.org/veniamseddolor.png?size=50x50&set=set1","birthday":"2003-08-15","address":"411 American Crossing","addressDetail":"Apt 75","userId":44, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Cathee Fernie","gender":1,"avatar":"https://robohash.org/molestiaeoptioqui.png?size=50x50&set=set1","birthday":"2003-04-03","address":"63 Summer Ridge Park","addressDetail":"4th Floor","userId":45, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Candide Houchin","gender":2,"avatar":"https://robohash.org/commodiatassumenda.png?size=50x50&set=set1","birthday":"2001-09-22","address":"10 Talisman Point","addressDetail":"Apt 1102","userId":46, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Natty Sneyd","gender":1,"avatar":"https://robohash.org/saepecumalias.png?size=50x50&set=set1","birthday":"2000-05-07","address":"47613 Victoria Pass","addressDetail":"PO Box 20060","userId":47, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Sela Delgado","gender":1,"avatar":"https://robohash.org/aspernaturmolestiaequia.png?size=50x50&set=set1","birthday":"2003-10-23","address":"286 Erie Hill","addressDetail":"Suite 61","userId":48, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Reece Bolmann","gender":1,"avatar":"https://robohash.org/eanostrumomnis.png?size=50x50&set=set1","birthday":"2002-07-13","address":"4 Alpine Trail","addressDetail":"Apt 85","userId":49, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Benedikta Strawbridge","gender":1,"avatar":"https://robohash.org/etilloomnis.png?size=50x50&set=set1","birthday":"2003-12-25","address":"8 Bellgrove Alley","addressDetail":"PO Box 49536","userId":50, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Ardelia Grimwood","gender":0,"avatar":"https://robohash.org/quiadoloreperspiciatis.png?size=50x50&set=set1","birthday":"2004-11-25","address":"2745 Briar Crest Avenue","addressDetail":"15th Floor","userId":51, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Fleur Beminster","gender":0,"avatar":"https://robohash.org/assumendafacereest.png?size=50x50&set=set1","birthday":"2004-11-08","address":"4413 Jay Way","addressDetail":"PO Box 81671","userId":52, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Hayes Powdrell","gender":0,"avatar":"https://robohash.org/quiaestmollitia.png?size=50x50&set=set1","birthday":"2004-03-13","address":"46733 Mosinee Road","addressDetail":"Suite 1","userId":53, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Myranda Clive","gender":2,"avatar":"https://robohash.org/consequaturmolestiaequia.png?size=50x50&set=set1","birthday":"2000-11-02","address":"11 Spenser Street","addressDetail":"PO Box 94049","userId":54, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Conan Corbould","gender":0,"avatar":"https://robohash.org/mollitiaperspiciatissed.png?size=50x50&set=set1","birthday":"2003-10-15","address":"95 Center Crossing","addressDetail":"Apt 925","userId":55, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Rex Bertlin","gender":1,"avatar":"https://robohash.org/minimamolestiaesit.png?size=50x50&set=set1","birthday":"2002-06-23","address":"69825 Gateway Alley","addressDetail":"PO Box 56015","userId":56, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Kimball Korneluk","gender":0,"avatar":"https://robohash.org/doloremsedsit.png?size=50x50&set=set1","birthday":"2004-03-03","address":"5293 Erie Place","addressDetail":"7th Floor","userId":57, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Lancelot Longfield","gender":0,"avatar":"https://robohash.org/nonvoluptatematque.png?size=50x50&set=set1","birthday":"2000-07-13","address":"02 Corry Crossing","addressDetail":"PO Box 59710","userId":58, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Alexandrina Cosham","gender":1,"avatar":"https://robohash.org/ametsimiliquevelit.png?size=50x50&set=set1","birthday":"2003-06-19","address":"786 Anthes Crossing","addressDetail":"PO Box 15497","userId":59, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Korey Oneil","gender":1,"avatar":"https://robohash.org/quibusdamquoet.png?size=50x50&set=set1","birthday":"2004-05-02","address":"2032 Westridge Drive","addressDetail":"Apt 1215","userId":60, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Lula Cassimer","gender":0,"avatar":"https://robohash.org/nemoaccusamusaut.png?size=50x50&set=set1","birthday":"2001-08-05","address":"0059 Sachtjen Crossing","addressDetail":"2nd Floor","userId":61, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Karlotte Blasik","gender":0,"avatar":"https://robohash.org/suscipitconsequaturquia.png?size=50x50&set=set1","birthday":"2004-10-25","address":"863 Lighthouse Bay Center","addressDetail":"17th Floor","userId":62, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Roddy Grindrod","gender":0,"avatar":"https://robohash.org/dignissimosexcepturivel.png?size=50x50&set=set1","birthday":"2001-10-23","address":"2 Nobel Junction","addressDetail":"PO Box 89300","userId":63, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Luce Scates","gender":0,"avatar":"https://robohash.org/inadipiscivoluptatem.png?size=50x50&set=set1","birthday":"2002-04-02","address":"72192 Transport Road","addressDetail":"Suite 64","userId":64, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Frances Skerme","gender":0,"avatar":"https://robohash.org/etametnobis.png?size=50x50&set=set1","birthday":"2003-08-26","address":"915 Eagan Trail","addressDetail":"Suite 48","userId":65, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Adrian Meade","gender":2,"avatar":"https://robohash.org/voluptatemvoluptatibuseaque.png?size=50x50&set=set1","birthday":"2000-09-11","address":"6 Golf View Alley","addressDetail":"Suite 31","userId":66, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Walt Orris","gender":2,"avatar":"https://robohash.org/consequaturprovidentquis.png?size=50x50&set=set1","birthday":"2004-10-04","address":"15311 Arapahoe Trail","addressDetail":"Room 515","userId":67, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Beatrice Lubman","gender":2,"avatar":"https://robohash.org/molestiaefugaet.png?size=50x50&set=set1","birthday":"2004-05-13","address":"5 Hermina Way","addressDetail":"Suite 88","userId":68, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Aguie Mountlow","gender":1,"avatar":"https://robohash.org/fugitconsecteturminus.png?size=50x50&set=set1","birthday":"2004-12-09","address":"0 Luster Way","addressDetail":"2nd Floor","userId":69, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Dynah Spurway","gender":2,"avatar":"https://robohash.org/totamiustoet.png?size=50x50&set=set1","birthday":"2004-07-06","address":"5 Summerview Place","addressDetail":"Suite 35","userId":70, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Jelene Scrannage","gender":1,"avatar":"https://robohash.org/doloribuserrorsequi.png?size=50x50&set=set1","birthday":"2003-05-30","address":"60141 Brickson Park Junction","addressDetail":"Room 1902","userId":71, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Cheryl Pagett","gender":2,"avatar":"https://robohash.org/sintautiste.png?size=50x50&set=set1","birthday":"2003-06-30","address":"2957 Sachs Alley","addressDetail":"14th Floor","userId":72, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Marabel Landsberg","gender":2,"avatar":"https://robohash.org/fugiatdolormagnam.png?size=50x50&set=set1","birthday":"2001-09-09","address":"29 Towne Place","addressDetail":"PO Box 50332","userId":73, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Barnett Boydon","gender":0,"avatar":"https://robohash.org/doloreligendicommodi.png?size=50x50&set=set1","birthday":"2001-08-24","address":"11762 Lawn Junction","addressDetail":"Room 874","userId":74, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Kally Guiden","gender":0,"avatar":"https://robohash.org/repellatetsit.png?size=50x50&set=set1","birthday":"2004-01-25","address":"2530 Fremont Parkway","addressDetail":"PO Box 40257","userId":75, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Selestina Giacomasso","gender":1,"avatar":"https://robohash.org/sitdoloresporro.png?size=50x50&set=set1","birthday":"2002-09-03","address":"9 Shasta Street","addressDetail":"Apt 329","userId":76, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Angel Tort","gender":2,"avatar":"https://robohash.org/odioaliquidducimus.png?size=50x50&set=set1","birthday":"2001-04-02","address":"21933 Elka Lane","addressDetail":"PO Box 86083","userId":77, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Cammy Eley","gender":0,"avatar":"https://robohash.org/veroullamet.png?size=50x50&set=set1","birthday":"2004-08-01","address":"77756 Jenifer Parkway","addressDetail":"Apt 1430","userId":78, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Dolf Woodrough","gender":2,"avatar":"https://robohash.org/consequaturquicumque.png?size=50x50&set=set1","birthday":"2001-09-25","address":"86362 Laurel Terrace","addressDetail":"Room 1197","userId":79, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Beverlie Bottini","gender":2,"avatar":"https://robohash.org/anequeodio.png?size=50x50&set=set1","birthday":"2002-01-30","address":"84760 Mitchell Junction","addressDetail":"Room 1120","userId":80, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Katerina Kingman","gender":1,"avatar":"https://robohash.org/rationeconsequaturillum.png?size=50x50&set=set1","birthday":"2003-05-01","address":"5 Utah Court","addressDetail":"4th Floor","userId":81, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Berny Schoolcroft","gender":0,"avatar":"https://robohash.org/eossedalias.png?size=50x50&set=set1","birthday":"2004-04-28","address":"045 David Pass","addressDetail":"PO Box 90044","userId":82, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Jae Butterick","gender":1,"avatar":"https://robohash.org/animiautdolores.png?size=50x50&set=set1","birthday":"2003-07-06","address":"69584 Mandrake Trail","addressDetail":"PO Box 94431","userId":83, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Eran Orr","gender":0,"avatar":"https://robohash.org/laudantiumofficiisvoluptatem.png?size=50x50&set=set1","birthday":"2002-05-02","address":"6865 Lien Parkway","addressDetail":"PO Box 51175","userId":84, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Rossie Jandera","gender":1,"avatar":"https://robohash.org/nostrumsaepevoluptatem.png?size=50x50&set=set1","birthday":"2000-12-02","address":"126 Mifflin Crossing","addressDetail":"3rd Floor","userId":85, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Ricky Fendlow","gender":0,"avatar":"https://robohash.org/eoscumnemo.png?size=50x50&set=set1","birthday":"2000-02-04","address":"30 Gerald Street","addressDetail":"Suite 98","userId":86, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Helen Oleszkiewicz","gender":1,"avatar":"https://robohash.org/veniamnonplaceat.png?size=50x50&set=set1","birthday":"2000-01-17","address":"5 Lillian Lane","addressDetail":"PO Box 4251","userId":87, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Cati Veltman","gender":1,"avatar":"https://robohash.org/blanditiistemporibusfacilis.png?size=50x50&set=set1","birthday":"2002-11-27","address":"6 Clemons Center","addressDetail":"14th Floor","userId":88, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Enrika Poag","gender":0,"avatar":"https://robohash.org/etsuscipittenetur.png?size=50x50&set=set1","birthday":"2004-12-26","address":"4321 Muir Lane","addressDetail":"PO Box 69567","userId":89, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Filippa Fothergill","gender":0,"avatar":"https://robohash.org/nequemodiautem.png?size=50x50&set=set1","birthday":"2002-03-03","address":"0 Transport Point","addressDetail":"Room 82","userId":90, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Dianne Peachman","gender":1,"avatar":"https://robohash.org/voluptatevoluptatemhic.png?size=50x50&set=set1","birthday":"2001-07-24","address":"19787 Lakewood Gardens Place","addressDetail":"1st Floor","userId":91, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Kellen Zini","gender":1,"avatar":"https://robohash.org/accusamusquidignissimos.png?size=50x50&set=set1","birthday":"2000-07-02","address":"72 Melvin Trail","addressDetail":"Apt 745","userId":92, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Miguel Marden","gender":2,"avatar":"https://robohash.org/quascommodidolores.png?size=50x50&set=set1","birthday":"2004-12-02","address":"68350 Waxwing Plaza","addressDetail":"13th Floor","userId":93, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Noah Eicheler","gender":2,"avatar":"https://robohash.org/aspernatursuscipitratione.png?size=50x50&set=set1","birthday":"2002-12-16","address":"84368 Hayes Court","addressDetail":"1st Floor","userId":94, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Ibbie Anthoin","gender":1,"avatar":"https://robohash.org/perspiciatisetid.png?size=50x50&set=set1","birthday":"2002-12-17","address":"93 Hudson Crossing","addressDetail":"4th Floor","userId":95, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Laverne Chitter","gender":0,"avatar":"https://robohash.org/suscipitnonquia.png?size=50x50&set=set1","birthday":"2003-02-09","address":"515 Vera Street","addressDetail":"PO Box 68666","userId":96, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Betta Billows","gender":2,"avatar":"https://robohash.org/explicaboadipisciunde.png?size=50x50&set=set1","birthday":"2002-11-21","address":"605 Sunnyside Point","addressDetail":"PO Box 81350","userId":97, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Zelma Dyer","gender":2,"avatar":"https://robohash.org/consequaturadipiscirerum.png?size=50x50&set=set1","birthday":"2001-09-06","address":"59 Riverside Center","addressDetail":"Suite 88","userId":98, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Garrard Duggen","gender":2,"avatar":"https://robohash.org/aliquidvoluptatemlaudantium.png?size=50x50&set=set1","birthday":"2000-07-04","address":"3 Blaine Road","addressDetail":"15th Floor","userId":99, createdAt: new Date(), updatedAt: new Date()},
{"fullName":"Gertrude Hallad","gender":0,"avatar":"https://robohash.org/temporefugiatvel.png?size=50x50&set=set1","birthday":"2004-08-07","address":"72 Shelley Way","addressDetail":"15th Floor","userId":100, createdAt: new Date(), updatedAt: new Date()}
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Detail', null, {});
  },
};
