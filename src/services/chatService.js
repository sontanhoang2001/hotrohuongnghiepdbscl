const User = require('../models').User;
const Messages = require('../models').Messages;
const Chat = require('../models').Chat;
const UserDetail = require('../models').UserDetail;
const Organization = require('../models').Organization;

// const sequelize = require('../database/connection_database');
const { Op, Sequelize } = require('sequelize');

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

  getAllChats: async (userId, organizationId, page, size) => {
    try {
      // Tính offset
      const offset = (page - 1) * size;
      let order = [['id', 'DESC']];

      // Tìm DS chatId thuộc tổ chức
      const listChatId = await Chat.findAll({
        where: {
          userId: {
            [Op.not]: userId,
          },
          organizationId,
        },
        attributes: ['id'],
        raw: true,
      });
      const arrayChatId = listChatId.map((chat) => chat.id);
      console.log('arrayChatId', arrayChatId);

      const latestMessages = await Messages.findAll({
        order,
        limit: size,
        offset,
        attributes: ['senderId', [Sequelize.fn('MAX', Sequelize.col('id')), 'latestChatId']],
        where: {
          chatId: { [Op.in]: arrayChatId },
          senderId: {
            [Op.not]: userId,
          },
        },
        group: ['senderId'],
        raw: true,
      });
      const arrayLatestMessageId = latestMessages.map((chat) => chat.latestChatId);
      console.log('arrayLatestMessageId', arrayLatestMessageId);

      // Hiện thị thông tin đầy đủ của list Chat gần nhất
      const { count, rows } = await Messages.findAndCountAll({
        where: {
          id: { [Op.in]: arrayLatestMessageId },
        },
        raw: true,
        attributes: [
          'id',
          'content',
          'type',
          'status',
          'chatId',
          'createdAt',
          [
            Sequelize.literal(`(
              SELECT fullName
              FROM user_detail AS UserDetail
              WHERE
              UserDetail.userId = Messages.senderId
            )`),
            'senderFullName',
          ],
          [
            Sequelize.literal(`(
              SELECT avatar
              FROM user_detail AS UserDetail
              WHERE
              UserDetail.userId = Messages.senderId
            )`),
            'senderAvatar',
          ],
        ],
      });

      // console.log('listChatRecently', listChatRecently);

      // xong ra kết quả

      // const listChatRecently = await Chat.findAll({
      //   offset,
      //   limit: size,
      //   // order,
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
      //       model: Messages,
      //       attributes: ['id', 'senderId', 'reciverId', 'content', 'status', 'createdAt'],
      //       order: [['createdAt', 'DESC']],
      //     },
      //   ],
      // });

      const pagination = {
        total: count,
        page,
        size,
        data: rows,
      };

      return pagination;
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
            attributes: ['id', 'senderId', 'reciverId', 'content', 'type', 'status', 'chatId', 'createdAt'],
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
        attributes: [
          'id',
          'status',
          'userId',
          'organizationId',
          'createdAt',
          [
            Sequelize.literal(`(
            SELECT name
            FROM organization AS Organization
            WHERE
            Organization.id = Chat.organizationId
          )`),
            'organizationName',
          ],
          [
            Sequelize.literal(`(
            SELECT image
            FROM organization_detail AS OrganizationDetail
            WHERE
            OrganizationDetail.id = Chat.organizationId
          )`),
            'organizationAvatar',
          ],
        ],
        include: [
          {
            offset,
            limit: size,
            order,
            model: Messages,
            attributes: ['id', 'senderId', 'reciverId', 'content', 'type', 'status', 'chatId', 'createdAt'],
          },
        ],
      });

      // console.log('chat >>>', chat);

      const chatExists = !!chat && chat.length > 0;
      if (!chatExists) {
        const createChat = await Chat.create({ status: 1, userId, organizationId });
        if (createChat) {
          const chat = await Chat.findAll({
            where: { userId, organizationId },
            attributes: [
              'id',
              'status',
              'userId',
              'organizationId',
              'createdAt',
              [
                Sequelize.literal(`(
              SELECT name
              FROM organization AS Organization
              WHERE
              Organization.id = Chat.organizationId
            )`),
                'organizationName',
              ],
            ],
            include: [
              {
                offset,
                limit: size,
                order,
                model: Messages,
                attributes: ['id', 'senderId', 'reciverId', 'content', 'type', 'status', 'chatId', 'createdAt'],
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
