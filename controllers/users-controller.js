const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt');
const authenticate = require("../authenticate");
const User = require("../models/user-model");

module.exports = {
  login:  function(request, response) {
    User.findOne({User_Mobile: request.body.User_Mobile },(async (err,userDocument)=>{
      if(err){
          return response.status(500).json({    //server error
              message:err
          })
      }else if(userDocument) {
          const result = await bcrypt.compare(request.body.User_Password, userDocument.User_Password);
          if(result === false){ //password is wrong
             return response.status(400).json({message: 'Password is incorrect'})   //bad request
          }else{
             return response.status(200).json({   //succees
                token: jwt.sign({id:userDocument._id, User_Name: userDocument.User_Name, User_Mobile: userDocument.User_Mobile, User_Email: userDocument.User_Email }, authenticate.jwtSecretString )
               });      
          }
      
      }else{
        return response.status(400).json({message: "No user exist with this mobile number"})      //bad request
      }

  }))
  },

  signup: async function(request, response) {
    
      var newUser = new User();
      newUser.User_Name = request.body.User_Name;
      newUser.User_Password = await bcrypt.hash(request.body.User_Password, 10);
      newUser.User_Mobile = request.body.User_Mobile;
      newUser.User_Email = request.body.User_Email;

      newUser.save(function(error, document) {
        if (error) {
          return response.status(500).json({  //server error
            message: error
          });
        } else {

          return response.status(200).json({   //sucees
            message: true
          });
        }
      });
    
  },

  getAllUsers: function(request, response) {
    User.find({}).exec(function(err, users) {
      if (err) {
        return response.status(500).json({ //server error
          message: err
        });
      } else   {
        response.json({ users: users });
      } 
    });
  },

  editUserById:(request,response)=>{
    var updatedUser={}
    updatedUser.User_Name=request.body.User_Name;
    updatedUser.User_Mobile=request.body.User_Mobile;
    updatedUser.User_Email=request.body.User_Email;

    const userID = request.params.id;
    User.findByIdAndUpdate(userID,updatedUser,
    (err,userDocument)=>{
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

changePassword: async function(request, response) {
  var updatedUser={}
    updatedUser.User_Password= await bcrypt.hash(request.body.User_Password, 10);

    const userID = request.params.id;
    User.findByIdAndUpdate(userID,updatedUser,
    (err,userDocument)=>{
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

deleteUser: (request,response)=>{
  const userID = request.params.id;

  User.deleteOne({ _id: userID }).exec((err,user)=>{
      if(err){
          return response.status(500).json({    //server error
              message:err
          })
      }else {
          return response.status(200).json({message: true})      //succees
      }

  })
}

};