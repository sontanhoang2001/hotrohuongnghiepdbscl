const User = require("../models").User;
const bcrypt = require("bcrypt");

module.exports = {
  createNew: async (userObj) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userObj.password, salt);

    try {
      // console.log("user", db);
      // const result = await db.User.create({
      //   userName: userObj.username,
      //   password: hashed,
      //   firstName: userObj.firstName,
      //   lastName: userObj.lastName,
      //   email: userObj.email,
      //   role_code: userObj.role_code,
      // });
      // console.log("Insert result:", result);
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    // return User.findAll({
    //   attributes: ["id", "firstName", "lastName", "email"],
    //   limit: 5,
    //   order: [["id", "DESC"]],
    // })

    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  },
};
