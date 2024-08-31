const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/developersApplications');

module.exports = connection;

//this is copied over from other projects - gary said it's the same always. 