const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./router');
const cors = require('cors');

// require('./database/connection_database');

//* Initializations
const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with the appropriate origin
dotenv.config();

//* Settings
const port = process.env.NODE_PORT;
// console.log(port);

//* Middlewares
app.use(morgan('dev'));

//* Enabling cors for all request by usiing cors middleware
app.use(cors());

/**
 * * Parse request of content-type: application/json
 * * Parses inconming request with JSON payloads
 */
app.use( express.json());
app.use( express.urlencoded( { extended:true } ) );

// Sử dụng middleware cookie-parser
app.use(cookieParser());

//* Routes
router(app);

//* Starting the server
app.listen( port, () => {
    console.log(`Server running in port ${port}`);
});