var mongoose = require('mongoose');

var categories =new mongoose.Schema({
    Category_Name: String,
    Category_Description: String,
});

categories = module.exports = mongoose.model('Categories',categories);

