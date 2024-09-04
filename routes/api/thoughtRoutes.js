const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, updateReaction } = require('../../controllers/thoughtController');

// GET all thoughts and POST a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// GET a single thought by its _id, update, and delete a thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


router.route('/:thoughtId/reactions')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
    .post(updateReaction);

module.exports = router;