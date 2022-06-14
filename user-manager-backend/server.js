const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

//LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

//LINKING ROUTER TO ROUTE
const users = require('./routes/users');
const user = require('./routes/auth');
const app = express();

//Body parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());
//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(credentials);

app.use(cors(corsOptions, { credentials: true }));
app.options(cors());
//MOUNT ROUTERS
app.use('/api/v1/users', users);
app.use('/api/v1/auth', user);

// HAVE TO USE AFTER THE MOUNT ROUTER

const PORT = process.env.PORT || 3000;

//TO CALL TO SERVER
const server = app.listen(
	PORT,
	console.log(`SERVER RUNNINT ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

//HANDLE UNHANDLED PROMISE REJECTIONS
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);

	//Close Server and Exit Process
	server.close(() => process.exit(1));
});
