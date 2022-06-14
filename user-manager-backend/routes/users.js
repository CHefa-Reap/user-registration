const express = require('express');
const router = express.Router();

const {
	getUsers,
	getUser,
	UpdaeUser,
	DeleteUser,
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

//ROTUERS IMPORT
router.route('/').get(getUsers);
router
	.route('/:id')
	.get(getUser)
	.put(protect, authorize('admin', 'user'), UpdaeUser)
	.delete(DeleteUser);
module.exports = router;
