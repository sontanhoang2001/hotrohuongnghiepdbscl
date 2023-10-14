const User = require("../models").User;
const bcrypt = require("bcrypt");

module.exports = {
  createNewUser: async (userObj) => {
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
      console.error(">>> check error: ", error);
      throw error;
    }
  },
  getAll: async (req, res) => {
    User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
      limit: 5,
      order: [["id", "DESC"]],
    })
      .then((users) => {
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });
  },
};
