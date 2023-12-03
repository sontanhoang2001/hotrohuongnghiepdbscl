const chatService = require('../services/chatService');
const responseHelper = require('../helpers/responseHelper');

module.exports = {
  isValidChatId: async (chatId) => {
    try {
      const checkChatId = await chatService.isValidChatId(chatId); // Gọi chức năng từ service
      if (checkChatId) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
  getAllChats: async (req, res) => {
    try {
      const userId = req.user.id;
      const page = (req.query.page && parseInt(req.query.page)) || 1;
      const size = (req.query.size && parseInt(req.query.size)) || 10;
      const search = req.query.search;

      
      const organizationId = req.query.organizationId && parseInt(req.query.organizationId);

      if (isNaN(organizationId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter full parameter');
      }

      const chatMessage = await chatService.getAllChats(userId, organizationId, page, size, search); // Gọi chức năng từ service
      if (chatMessage) {
        return responseHelper.sendResponse.SUCCESS(res, chatMessage);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  getChatMessagesById: async (req, res) => {
    try {
      const chatId = req.query.chatId && parseInt(req.query.chatId);
      const beforeId = req.query.beforeId && parseInt(req.query.beforeId);
      const size = req.query.size && parseInt(req.query.size);

      if (isNaN(chatId) || isNaN(beforeId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter full parameter');
      }

      const chatMessage = await chatService.getChatMessagesById(chatId, beforeId, size); // Gọi chức năng từ service
      if (chatMessage) {
        return responseHelper.sendResponse.SUCCESS(res, chatMessage);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  getChatMessagesCustomer: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const organizationId = req.query.organizationId && parseInt(req.query.organizationId);
      const beforeId = req.query.beforeId && parseInt(req.query.beforeId);
      const size = req.query.size && parseInt(req.query.size);

      if (isNaN(organizationId) || isNaN(beforeId)) {
        return responseHelper.sendResponse.BAD_REQUEST(res, null, 'You must enter full parameter');
      }

      const chatMessage = await chatService.getChatMessagesCustomer(userId, organizationId, beforeId, size); // Gọi chức năng từ service
      if (chatMessage) {
        return responseHelper.sendResponse.SUCCESS(res, chatMessage);
      }

      return responseHelper.sendResponse.BAD_REQUEST(res, null);
    } catch (error) {
      responseHelper.sendResponse.SERVER_ERROR(res, null);
      throw error;
    }
  },

  storeMessage: async (data) => {
    try {
      const payload = {
        chatId: data.chatId,
        senderId: data.senderId,
        reciverId: data.reciverId,
        content: data.content,
        type: data.type,
      };
      const storeMessage = await chatService.storeMessage(payload); // Gọi chức năng từ service
      if (storeMessage) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
};
