const mongoose = require('mongoose')

 const DBConnection = async (DB_URL) =>{

    try{

        const options = {
            dbName:"bookreviewdb"
        }
        const db =  await mongoose.connect(DB_URL, options)
        console.log("connected...................")
    }catch(err){
        console.log(err)
    }
}


module.exports = DBConnection