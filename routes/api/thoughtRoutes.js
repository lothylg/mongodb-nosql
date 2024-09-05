const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, updateReaction, deleteReaction } = require('../../controllers/thoughtController');

// GET all thoughts and POST a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// GET a single thought by its _id, update, and delete a thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

//reactions through thoughts by it's id post(update) and delete
router.route('/:thoughtId/reactions').post(updateReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;