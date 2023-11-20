import dbConnection from "../database/dbConnection";
const bcrypt = require("bcrypt");

export const createUser = async (user) => {
  try {
    if (!user.username || !user.password || !user.fullname) {
      throw new Error("Fields cannot be empty");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password, salt);

    const userObj = [
      (user.account_type = 0),
      user.username,
      (user.password = hashed),
      user.fullname,
      (user.role = 5),
    ];

    // Create new user
    const sqlQuery =
      "INSERT INTO users (account_type, username, password, fullname, role) VALUES (?, ?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      dbConnection.query(sqlQuery, userObj, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.insertId);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
