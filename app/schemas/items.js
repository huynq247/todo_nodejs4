const mongoose = require ('mongoose');

var schema = new mongoose.Schema({
 name: String,
 status: String,
});

module.exports = mongoose.model('items', schema);