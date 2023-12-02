const User = require('../models').User;
const Messages = require('../models').Messages;
const Chat = require('../models').Chat;
const UserDetail = require('../models').UserDetail;

// const sequelize = require('../database/connection_database');
const { Op, where } = require('sequelize');

module.exports = {
  isValidChatId: async (chatId) => {
    try {
      const chat = await Chat.findAll({
        where: { id: chatId },
      });

      return (chatExists = !!chat && chat.length > 0);
    } catch (error) {
      throw error;
    }
  },

  getAllChats: async (userId, organizationId, beforeId, size) => {
    try {
      // Tính offset
      let offset = 0;
      let order = [['id', 'ASC']];
      if (beforeId !== -1) {
        // tìm vị trí của message có id = beforeId

        const beforeMessageIndex = await Chat.count({
          where: {
            id: {
                   //     userId: {
      //       [Op.not]: userId,
      //     },
              [Op.lt]: beforeId,
            },
          },
        });

        offset = Math.max(0, beforeMessageIndex - size);
      } else {
        order = [['id', 'DESC']];
      }

      // const listChat = await Chat.findAll({
      //   offset,
      //   limit: size,
      //   order,
      //   where: {
      //     organizationId: organizationId,
      //     userId: {
      //       [Op.not]: userId,
      //     },
      //   },
      //   attributes: ['id', 'status', 'userId', 'organizationId', 'createdAt'],
      //   include: [
      //     {
      //       model: User,
      //       attributes: ['id', 'email', 'phone'],
      //       include: [
      //         {
      //           model: UserDetail,
      //           attributes: ['id', 'fullName', 'gender', 'avatar', 'birthday', 'address', 'addressDetail'],
      //         },
      //       ],
      //     },
      //     {
      //       where: {
      //         senderId: {
      //           [Op.not]: userId,
      //         },
      //       },
      //       limit: 1,
      //       order: [['createdAt', 'DESC']],
      //       model: Messages,
      //       attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'createdAt'],
      //     },
      //   ],
      // });

      const listChat = await Messages.findAll({
        offset,
        limit: size,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'createdAt'],
      });

      return listChat;
    } catch (error) {
      throw error;
    }
  },

  getChatMessagesById: async (chatId, beforeId, size) => {
    try {
      // Tính offset
      let offset = 0;
      let order = [['id', 'ASC']];
      if (beforeId !== -1) {
        // tìm vị trí của message có id = beforeId

        const beforeMessageIndex = await Messages.count({
          where: {
            chatId,
            id: {
              [Op.lt]: beforeId,
            },
          },
        });

        offset = Math.max(0, beforeMessageIndex - size);
      } else {
        order = [['id', 'DESC']];
      }

      const chatData = await Chat.findAll({
        where: { id: chatId },
        attributes: ['id', 'status', 'userId', 'organizationId', 'createdAt'],
        include: [
          {
            offset,
            limit: size,
            order,
            model: Messages,
            attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'chatId', 'createdAt'],
          },
        ],
      });

      return chatData;
    } catch (error) {
      throw error;
    }
  },

  getChatMessagesCustomer: async (userId, organizationId, beforeId, size) => {
    try {
      // Tính offset
      let offset = 0;
      let order = [['id', 'ASC']];
      if (beforeId !== -1) {
        // tìm vị trí của message có id = beforeId

        const findChatId = await Chat.findOne({
          where: { userId, organizationId },
          attributes: ['id'],
          raw: true,
        });

        const chatId = findChatId.id;

        const beforeMessageIndex = await Messages.count({
          where: {
            chatId,
            id: {
              [Op.lt]: beforeId,
            },
          },
        });

        offset = Math.max(0, beforeMessageIndex - size);
      } else {
        order = [['id', 'DESC']];
      }

      const chat = await Chat.findAll({
        where: { userId, organizationId },
        attributes: ['id', 'status', 'userId', 'organizationId', 'createdAt'],
        include: [
          {
            offset,
            limit: size,
            order,
            model: Messages,
            attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'chatId', 'createdAt'],
          },
        ],
      });

      const chatExists = !!chat && chat.length > 0;
      if (!chatExists) {
        const createChat = await Chat.create({ status: 1, userId, organizationId });
        if (createChat) {
          const chat = await Chat.findAll({
            where: { userId, organizationId },
            attributes: ['id', 'status', 'userId', 'organizationId', 'createdAt'],
            include: [
              {
                offset,
                limit: size,
                order,
                model: Messages,
                attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'chatId', 'createdAt'],
              },
            ],
          });
          return chat;
        }
      }

      // messages = chat[0].Messages.reverse();

      // console.log("messages", messages)

      return chat;
    } catch (error) {
      throw error;
    }
  },

  storeMessage: async (payload) => {
    try {
      // Lưu tin nhắn mới
      const messages = await Messages.create(payload);
      return messages;
    } catch (error) {
      throw error;
    }
  },
};
