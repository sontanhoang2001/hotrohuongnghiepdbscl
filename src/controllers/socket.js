const chatController = require('../controllers/chatController');

// Tạo hàm xử lý sự kiện connection
async function handleConnection(socket, io) {
  console.log('New client connected' + socket.id);

  socket.on('joinRoom', async (msg) => {
    const chatId = msg.chatId;
    const userId = msg.userId;

    const checkIsValidChatId = await chatController.isValidChatId(chatId);
    if (checkIsValidChatId) {
      console.log(`${userId} >>> Đã kết nối đến chatId: ${chatId}`);
      socket.emit('joinRoomStatus', { status: true, data: null, message: `Đã kết nối đến chatId: ${chatId}` });
      socket.join(chatId);
    } else {
      socket.emit('joinRoomStatus', { status: false, data: null, message: `Đã kết nối đến chatId: ${chatId} thất bại` });
      console.log(`kết nối đến chatId ${chatId} thất bại`);
      // socket.emit('error', 'Invalid chatId code');
    }
  });

  socket.on('chatMessage', async (data) => {
    const storeMessage = await chatController.storeMessage(data);
    if (storeMessage) {
      console.log('Đã gửi tin nhắn: ', data);
      io.to(data.chatId).emit('newMessage', data);

      // Thông báo cho admin organization nếu có ng dùng nt
      const isStudent = data.isStudent || false;
      if (isStudent) {
        socket.on('notificationForOrganization', async (data) => {
          console.log('Có tin nhắn mới', data);
        });
      }
    } else {
      const content = 'Gửi tin nhắn thất bại';
      console.log('Gửi tin nhắn thất bại: ', { ...data, content });
      io.to(data.chatId).emit('newMessage', { ...data, content });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}
module.exports = { handleConnection };
