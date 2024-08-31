
//import in the modules / routes from the different folder
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//tell the router to use url endings
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;