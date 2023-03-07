const mongoose = require('mongoose');
const bycrpt = require('bcrypt')
const {isEmail}=require('validator')
const usersSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'name is required'],
        lowercase:true,
    },
    lastname:{
        type:String,
        required:[true, 'please enter a LastName'],
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'please enter a Valid email']
    },
    password:{
        type:String,
        required:[true, 'please enter a password'],
        minLength:[6,'min 6 required']
    }
});

usersSchema.pre('save',async function(next){
 const salt = await bycrpt.genSalt();
 this.password =  await bycrpt.hash(this.password,salt)
 next()
})
usersSchema.post('save',(doc,next)=>{
    console.log('i am going to be post' , doc);
    next()
})
const user = mongoose.model('user',usersSchema);
module.exports = user; 