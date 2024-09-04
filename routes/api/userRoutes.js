const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, addThought, removeThought, updateUser } = require('../../controllers/usersController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/thoughts').post(addThought);

router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

router.route('/:userId/friends/:friendId').get(getSingleUser).post(createUser);


module.exports = router;