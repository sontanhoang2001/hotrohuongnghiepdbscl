const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./router');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io module
const socketController = require('./controllers/socket');

// require('./database/connection_database');

//* Initializations
const app = express();
dotenv.config();

//* Settings
// const port = process.env.NODE_PORT;
const port = process.env.PORT;
// console.log(port);

//* Middlewares
app.use(morgan('dev'));

//* Enabling cors for all request by usiing cors middleware
// app.use(cors());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://hotrohuongnghiepdbscl.web.app'];
app.use(cors({ origin: allowedOrigins })); // Replace with the appropriate origin

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on("connection", (socket) => {
  socketController.handleConnection(socket, io);
});

/**
 * * Parse request of content-type: application/json
 * * Parses inconming request with JSON payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng middleware cookie-parser
app.use(cookieParser());

//* Routes
router(app, io);

//* Starting the server
server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
