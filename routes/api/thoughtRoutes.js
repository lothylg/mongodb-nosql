const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

//getting into api folder to get thoughts and post some as well
router.route('/').get(getThoughts).post(createThought);

//reaching into the api folder to to run some functions
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;