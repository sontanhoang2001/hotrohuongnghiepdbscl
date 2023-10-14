const dbConnection = require("../database/dbConnection");

const bcrypt = require("bcrypt");
const handleQueryResult = require("../middleware/handleQueryResult"); // Điều hướng đến tệp middleware

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = req.body;
      if (!user.username || !user.password || !user.fullname) {
        return res.json({
          ErrorCode: 204,
          Message: "Fields cannot be empty",
        });
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
      let sqlQuery =
        "INSERT INTO users (account_type, username, password, fullname, role) VALUES ( ?,?,?,?,?)";
      dbConnection.query(sqlQuery, userObj, (err, data) => {
        if (err) throw err;
        res.status(201).json("User created with id: " + data.insertId);
      });
    } catch (error) {
      return res.json({
        ErrorCode: 500,
        Message: "",
      });
    }
  },
  login: async (req, res) => {
    const user = req.body;
    const userObj = [user.username];

    if (!user.username || !user.password) {
      return res.status(400).json({
        ErrorCode: 204,
        Message: "Fields cannot be empty",
      });
    }

    let sqlQuery = "SELECT * FROM users WHERE `username` = ?";
    dbConnection.query(sqlQuery, userObj, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Database error");
      }

      if (data.length > 0) {
        const userData = data[0];
        const validPassword = await bcrypt.compare(
          user.password,
          userData.password
        );

        if (!validPassword) {
          res.status(401).json("Mật khẩu không đúng!");
        } else {
          handleQueryResult(err, data, 200, "Đăng nhập thành công!");
          // res.status(200).json("Đăng nhập thành công!");
        }
      } else {
        res.status(401).json("Tài khoản không tồn tại!");
      }
    });
  },
};
