const router = require('express').Router();
const apiRoutes = require('./api');

//telling router to head into the api folder to use those routes. 
router.use('/api', apiRoutes);

router.use((req,res) => res.send('wrong route!'));

module.exports = router;