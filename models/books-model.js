var mongoose = require('mongoose');

var books =new mongoose.Schema({
    
    Book_Serial_Number   : String, 
    Book_Name            : String, 
    Book_Author          : String, 
    Book_Category        : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    Book_Publishing_House : String,  //دار النشر 
});

books = module.exports = mongoose.model('Books',books);

