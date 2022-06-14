const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//GET ALL USERS
exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await Users.find();
	res.status(200).json({ sucess: true, count: users.length, data: users });
});

exports.getUser = async (req, res, next) => {
	try {
		const users = await Users.findById(req.params.id);

		if (!users) {
			return next(
				new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
			);
		}
		res.status(200).json({ sucess: true, data: users });
	} catch (err) {
		next(err);
	}
};

//UPDATE ALL USERS
exports.UpdaeUser = asyncHandler(async (req, res, next) => {
	const users = await Users.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!users) {
		return res.status(400).json({ sucess: false });
	}

	res.status(200).json({ sucess: true, data: users });
});

//DELETTE ALL USERS
exports.DeleteUser = asyncHandler(async (req, res, next) => {
	const users = await Users.findByIdAndDelete(req.params.id);
	if (!users) {
		return res.status(400).json({ sucess: false });
	}

	res.status(200).json({ sucess: true, data: {} });
});

exports.getUserByEmail = asyncHandler(async (email, req, res) => {
	const UserDetail = await Users.findOne({ email });
	console.log(UserDetail);
});
