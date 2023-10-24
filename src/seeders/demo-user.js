"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          account_type: 0,
          username: "admin",
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          fullname: "admin",
          avatar: "https://media.licdn.com/dms/image/C4E03AQEmIVL2LZyMmA/profile-displayphoto-shrink_200_200/0/1604397377631?e=1698883200&v=beta&t=tOpg8aUYYaQWYC5fxm3arrWLunBBULdQOD_W7aKjxxc",
          email: "admin@gmail.com",
          birthday: "1992-03-08",
          phone: '19001087',
          address: "Cần Thơ",
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          account_type: 0,
          username: "sontanhoang",
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          fullname: "Sơn Tấn Hoàng",
          avatar: "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/369789181_3567913396872577_3439423791380724809_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Y68bXy_HtfMAX8gIOSY&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAnX8NZ8yB-1LBQB567PWmQmcWTKAXGozU1yu9Ip86PxQ&oe=652FCF00",
          email: "tanhoang@gmail.com",
          birthday: "2001-06-06",
          phone: '0921838021',
          address: "Vĩnh Long",
          role: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          account_type: 0,
          username: "thiennhon",
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          fullname: "Nguyễn Thiện Nhơn",
          avatar: "https://nhadepso.com/wp-content/uploads/2023/03/suu-tam-50-anh-avatar-ngau-cho-nam-dep-buon-an-tuong-nhat_1.jpg",
          email: "thiennhon@gmail.com",
          birthday: "1998-01-01",
          phone: '0973659217',
          address: "Cần Thơ",
          role: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          account_type: 0,
          username: "phanhuukiet",
          password: "$2b$10$Su5tTXziIdI/qARWHn4tRuvx/jHU9nnggDUPC85L1ohmwa.4M2XCm",
          fullname: "Phan Hữu Kiệt",
          avatar: "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/352092063_222646813568123_840409087691973097_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xNySHKrCEtYAX-Zc0G_&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfD5pRqkjATR3Po3LNGddv3MhIo3uEcitLIDO97gBJzVgw&oe=652FDC21",
          email: "tanhoang@gmail.com",
          birthday: "2001-01-01",
          phone: '0973659217',
          address: "Cần Thơ",
          role: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};