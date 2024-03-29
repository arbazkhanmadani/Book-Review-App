const mongoose = require('mongoose')


const schema = mongoose.Schema({

    username:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,trim:true}
})

const usermodel = mongoose.model('users',schema)


module.exports = usermodel