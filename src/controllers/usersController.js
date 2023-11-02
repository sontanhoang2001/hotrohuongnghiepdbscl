const User = require('../models').User;
const userService = require('../services/userService');
const dbConnection = require('../database/dbConnection');
const responseHelper = require('../helpers/responseHelper');

module.exports = {
  getUsers: async (req, res) => {
    try {
      let size = Number.isInteger(req.query.size) ? parseInt(req.query.size) : 10;
      let page = Number.isInteger(req.query.page) ? parseInt(req.query.page) : 1;

      const users = await userService.getAll(page, size); // Gọi chức năng từ service
      if (users) {
        return responseHelper.sendResponse.SUCCESS(res, users);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }

    //   let sqlQuery = "SELECT * FROM users";
    //   dbConnection.query(sqlQuery, (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json(results);
    //   });
  },
  getUserById: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const users = await userService.getUserByUserId(userId); // Gọi chức năng từ service
      responseHelper.sendResponse.SUCCESS(res, users);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const users = await userService.getUserByUserId(userId); // Gọi chức năng từ service
      responseHelper.sendResponse.SUCCESS(res, users);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = parseInt(req.user.id);
      const user = req.body;

      if (isNaN(userId)) {
        return responseHelper.sendResponse.BAD_REQUEST(
          res,
          null,
          'You must enter a valid userId as a parameter',
        );
      }

      if (
        !user.fullName ||
        !user.gender ||
        !user.avatar ||
        !user.birthday ||
        !user.address ||
        !user.addressDetail
      ) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null);
      }

      const updateUserInfo = await userService.updateUser({ ...user, userId });
      if (updateUserInfo) {
        return responseHelper.sendResponse.SUCCESS(res, null);
      }

      return responseHelper.sendResponse.NOT_FOUND(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
    }
  },

  deleteOneUser: (req, res) => {
    const user_id = parseInt(req.params.id);

    if (isNaN(user_id)) {
      return res.json('You must enter a valid user_id as a parameter');
    }

    let sqlQuery = `DELETE FROM users WHERE user_id = ${user_id}`;

    dbConnection.query(sqlQuery, (error) => {
      if (error) throw error;
      res.status(200).json(`User with user_id ${user_id} deleted successfully`);
    });
  },
};
