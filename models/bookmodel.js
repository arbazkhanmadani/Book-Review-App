const mongoose = require('mongoose')


const schema = mongoose.Schema({

    bookisbn:{type:String,required:true,unique:true,trim:true},
    booktitle:{type:String,required:true,trim:true},
    bookauther:{type:String,required:true,trim:true},
    bookreview:{type:String,required:true,trim:true}

})

const bookmodel = mongoose.model('books',schema)


module.exports = bookmodel