var Category = require("../models/categories-model")

module.exports={
    addCategory:(request,response)=>{
    const newCategory = new Category();
    newCategory.Category_Name= request.body.Category_Name;
    newCategory.Category_Description= request.body.Category_Description;

    newCategory.save((err,document)=>{
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

editCategoryById:(request,response)=>{
    var updatedCategory={}
    updatedCategory.Category_Name=request.body.Category_Name;
    updatedCategory.Category_Description=request.body.Category_Description;

    const categoryID = request.params.id;
    Category.findByIdAndUpdate(categoryID,updatedCategory,
    (err,category)=>{
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
    Category.find({}, ((err,categories)=>{
        if(err){
            return response.status(500).json({     //server error
                message:err
            })
        }else  {
            return response.status(200).json({categories : categories})      //succees
        }

    }))
},

getOneById:(request,response)=>{
    const categoryID = request.params.id;

    Category.findById(categoryID).exec((err,category)=>{
        if(err){
            return response.status(500).json({    //server error
                message:err
            })
        }else  {
            return response.status(200).json({category:category})      //succees
        }
    })
},

deleteCategory: (request,response)=>{
    const categoryID = request.params.id;

    Category.deleteOne( {_id: categoryID} ).exec((err,category)=>{
        if(err){
            return response.status(500).json({    //server error
                message:err
            })
        }else  {
            return response.status(200).json({message: true})      //succees
        }
    })
},

}