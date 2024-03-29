const usermodel = require('../models/usermodel')
const bookmodel = require('../models/bookmodel')


//Adding books....................
const addBooks = async(req, res)=>{

    const{bookisbn, booktitle, bookauther, bookreview} = req.body

    try{
     if(req.body){
       
        if((bookreview.length>=0 || bookreview.length<=7) && bookisbn.length==13){
            const doc = bookmodel({
                bookisbn, booktitle, bookauther, bookreview
            })
            const msg= await doc.save()
            console.log(msg)
    
            if(msg!==null){
                res.status(200).json({"status":"success","message":"data inserted succesfully."})
            }
        }else{
            res.status(200).json({"status":"unseccessfull","message":"book review must be in range of 1-5 or isbn = 13"})
        }
       

    }else{
        res.status(404).json({"status":"failed","message":"fields can not be blank."})
    }
    }catch(err){
        res.status(404).json({"status":"failed","message":"error in submitting."})
    }
}

//Getting all books....................
const getAllBookList = async(req, res)=>{

    try{
        const books = await bookmodel.find().select('-__v')
        console.log(books)
       
       
        res.status(404).json({"status":"success","books":books})
    }catch(err){
        res.status(404).json({"status":"failed","message":"books not found."})
    }

}


//Updating ISBN books...................
const getBookByISBN = async(req, res)=>{

    const isbn = req.query.isbn
    console.log(isbn)
    try{

        if(isbn){

            const books = await bookmodel.find({bookisbn:isbn}).select('-_id').select('-__v').sort({bookisbn:1})
            console.log(books)
           
            if(books.length!=0){
                res.status(404).json({"status":"success","books":books})
            }else{
                res.status(404).json({"status":"failed","message":"enter a valid 13 digit isbn."})
            }

        }else{
            res.status(404).json({"status":"failed","message":"books not found for this isbn."})
        }
       
    }catch(err){
        res.status(404).json({"status":"failed","message":"books not found."})
        console.log(err)
    }
}


//Deleting title books...................
const getBookByTitle = async(req, res)=>{

    const title = req.query.title
    console.log(title)

    try{

        if(title){
            const bookByTitle = await bookmodel.find({booktitle:title}).select('-_id').select('-__v').sort({booktitle:1})
            console.log(bookByTitle)
           
            
            if(bookByTitle.length!=0){
                res.status(404).json({"status":"success","books":bookByTitle})
            }else{
                res.status(404).json({"status":"failed","message":"no book found for this title."})
            }

        }else{
            res.status(404).json({"status":"failed","message":"books not found for this title."})
        }
       
    }catch(err){
        res.status(404).json({"status":"failed","message":"books not found."})
        console.log(err)
    }
}



//Deleting auther books...................
const getBookByAuther = async(req, res)=>{

    const auther = req.query.auther
    console.log(auther)

    try{

        if(auther){
            const bookByAuther = await bookmodel.find({bookauther:auther}).select('-_id').select('-__v').sort({bookauther:1})
            console.log(bookByAuther)
           

            
            if(bookByAuther.length!=0){
                res.status(404).json({"status":"success","books":bookByAuther})
            }else{
                res.status(404).json({"status":"failed","message":"no book found for this auther."})
            }
        }else{
            res.status(404).json({"status":"failed","message":"books not found for this auther."})
        }
       
    }catch(err){
        res.status(404).json({"status":"failed","message":"books not found."})
        console.log(err)
    }
}



//Deleting Review books...................
const getBooksByReview = async(req, res)=>{

    const review = req.query.review
    console.log(review)

    try{

        if(review){
            if(review.length>=4 || review.length<=7){
            const bookbyreview = await bookmodel.find({bookreview:review}).select('-_id').select('-__v').sort({bookreview:1})
            console.log(bookbyreview)
            

            if(bookbyreview.length!=0){
                res.status(404).json({"status":"success","books":bookbyreview})
            }else{
                res.status(404).json({"status":"failed","message":"no book found for this review."})
            }

            }
            else{
                res.status(200).json({"status":"unseccessfull","message":"book review must be in range of 1-5"})
            }
            
           
        }else{
            res.status(404).json({"status":"failed","message":"books not found for this review."})
        }
       
    }catch(err){
        res.status(404).json({"status":"failed","message":"books not found."})
        console.log(err)
    }
}



module.exports = {
    addBooks,
    getAllBookList,
    getBookByISBN,
    getBookByTitle,
    getBookByAuther,
    getBooksByReview
}