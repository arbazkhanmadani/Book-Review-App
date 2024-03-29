const usermodel = require('../models/usermodel')
const bookmodel = require('../models/bookmodel')

const jwt = require('jsonwebtoken')


class User{

//Getting all books....................
static adduser = async(req, res)=>{

   

    const{username, password} = req.body
  
    try{
     if(req.body){

        if((username.length>=3 || username.length<=10 ) && (password.length>2 || password.length<=6)){

            const doc = usermodel({
                username,
                password 
            })
            
            const user = await doc.save()
            console.log(user)
            user.password = undefined
            
            
            if(user!==null){
                res.status(200).json({"status":"success","message":"data inserted succesfully.","user":user})
            }
        }
        else{
            res.status(404).json({"status":"failed","message":"password must be 3-6 chra long\n username must be 3-10 char long\nemail must be in format"})
        }

     }else{
        res.status(404).json({"status":"failed","message":"all fields are mendatory."})
     }
   }catch(err){
    console.log(err)
   res.status(404).json({"status":"failed","message":"This username already found, username must be unique"})

   }


}





//Login...................
static login = async(req, res)=>{

    

    const{username, password} = req.body
    const strPass = password.toString()

    try{
     if(req.body){
 
        const user = await usermodel.findOne({username:username})
        console.log(user)
          
        
       
        if(user){
            console.log(user.password+"   =============user passs")
         if(user.username===username && user.password==password){

            const token = jwt.sign({userID:user._id}, process.env.JWT_TOKEN, {expiresIn:'5d'})
            console.log(user+" ==========login")
            console.log(token+" ==login")
    
            if(user!==null){
                res.status(200).json({"status":"success","message":"loged in", "jwtToken":token, "_id":user._id})
            }
         }
         else{
            res.status(404).json({"status":"failed","message":"Not a valid user."})
         }
        }else{
            res.status(404).json({"status":"failed","message":"user not found"})
        }

     }else{
        res.status(404).json({"status":"failed","message":"all fields are mendatory."})
     }
   }catch(err){
    console.log(err+" ============================Error")
    res.status(404).json({"status":"failed","message":err})

   }


}





//Getting Review....................
static addReview = async(req, res)=>{

    const review = req.query.review
    const userID = req.headers['_id']
    const bookID = req.headers['bookid']
    
  
    try{

        if( review || (review.length>=4 || review.length<=7)){

            const updatedBook = await bookmodel.findOneAndUpdate( { _id: bookID }, { $set: { bookreview: review } } ).select('-_id').select('-__v')
            console.log(updatedBook+" =================book")
            res.status(200).json({"status":"success","message":"Review added",book : updatedBook})
            
        }else{
            res.status(404).json({"status":"failed","message":"reivew can not be empty"})
        }
    }catch(err){

    console.log(err+" ============================Error")
    res.status(404).json({"status":"failed","message":err})
    }
}


//Updating Review...................
static updateReview = async(req, res, next)=>{

    const review = req.query.review
    const bookID = req.headers['bookid']
           
    try{

        if( review && (review.length>=4 || review.length<=7) ){

            const updatedBook = await bookmodel.findOneAndUpdate( { _id: bookID },{ $set: { bookreview: review }},{ returnDocument: "after" } ).select('-_id').select('-__v')
            console.log(updatedBook)
            res.status(200).json({"status":"success","message":"book updated",book : updatedBook})
        }else{
            res.status(404).json({"status":"failed","message":"review cn not be empty"})
        }
    }catch(err){

    console.log(err+" ============================Error")
    res.status(404).json({"status":"failed","message":err})
    }
}


//Deleting Review...................
static deleteReview = async(req, res)=>{

}


}


module.exports = User



