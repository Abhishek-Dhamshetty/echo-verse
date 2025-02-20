const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
})

const Admin=mongoose.model('admin',adminSchema);


module.exports=Admin;