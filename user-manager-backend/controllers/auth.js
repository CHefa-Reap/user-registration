const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const userData = require('./users');

//@desc  Register User
//@route GET /api/v1/auth/register
//@access Public

exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	//Create User
	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	sendTokenResponse(user, 200, res);
});

//@desc  Login User
//@route GET /api/v1/auth/login
//@access Public

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	//Validate email and password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials  ', 401));
	}

	//Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	sendTokenResponse(user, 200, res);
});

//Get token from model, create cookie and send  response
const sendTokenResponse = (user, statusCode, res) => {
	//Create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		sucess: true,
		token,
		user,
	});
};

//@desc  Get Current Logged in user
//@route GET /api/v1/auth/me
//@access Private

exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		sucess: true,
		data: user,
	});
});

exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expired: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		sucess: true,
		data: {},
	});
});
