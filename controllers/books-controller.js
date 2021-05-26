var Book = require("../models/books-model")

module.exports={
    addBook:(request,response)=>{
    const newBook = new Book();
    newBook.Book_Serial_Number= request.body.Book_Serial_Number;
    newBook.Book_Name= request.body.Book_Name;
    newBook.Book_Author= request.body.Book_Author;
    newBook.Book_Category= request.body.Book_Category;
    newBook.Book_Publishing_House= request.body.Book_Publishing_House;

    newBook.save((err,document)=>{
        if(err){
            return response.status(500).json({  //server error
                message:err
            })
        }else {
            return response.status(200).json({   //succees
                message:true
            })
        }
    })
},

editBookById:(request,response)=>{
    var updatedBook={}
    updatedBook.Book_Serial_Number=request.body.Book_Serial_Number;
    updatedBook.Book_Name=request.body.Book_Name;
    updatedBook.Book_Author=request.body.Book_Author;
    updatedBook.Book_Category=request.body.Book_Category;
    updatedBook.Book_Publishing_House=request.body.Book_Publishing_House;

    const bookID = request.params.id;
    Book.findByIdAndUpdate(bookID,updatedBook,
    (err,Book)=>{
        if(err){
            return response.status(500).json({    //server error
                message:err
            })
        }else  {
            return response.status(200).json({    //succees
                message:true,
            })
        }
    })
},

getAll:(request,response)=>{
    Book.find({})
    .populate({path: "Book_Category"})
    .exec((err,books)=>{
        if(err){
            return response.status(500).json({     //server error
                message:err
            })
        }else  {
            return response.status(200).json({books : books})      //succees
        }

    })
},

getOneById:(request,response)=>{
    const bookID = request.params.id;

    Book.findById(bookID).exec((err,book)=>{
        if(err){
            return response.status(500).json({    //server error
                message:err
            })
        }else {
            return response.status(200).json({book:book})      //succees
        }

    })
},

deleteBook: (request,response)=>{
    const bookID = request.params.id;

    Book.deleteOne({ _id: bookID }).exec((err,book)=>{
        if(err){
            return response.status(500).json({    //server error
                message:err
            })
        }else {
            return response.status(200).json({message: true})      //succees
        }

    })
}

}