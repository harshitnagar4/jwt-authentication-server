const User = require('./models/user')
// error handler
const handleError = (error)=>{
  const errData = {firstname:"",lastname:"",email:"",password:""}
if(error.message.includes('user validation failed')){
  Object.values(error.errors).forEach(({properties})=>{
  errData[properties.path]=properties.message
  })
}
return errData

}
const loginErrorHandler = (error)=>{
const errData = {email:"",password:""};
console.log(error)
}

module.exports.signup_post = async(req,res)=>{
   const{firstname,lastname,email,password}=req.body;
 try {
const user =  await User.create({firstname,lastname,email,password});
    console.log(user)
    res.status(201).json(user)
}
  catch (error) {
    const errors  = handleError(error);
    console.log(errors,'err')
    res.status(400).json(errors)
     console.log(errors,'err')
 }
   
}
module.exports.login_post = async (req,res)=>{
    const{email,password}=req.body
    const user = await  User.findOne({email});
    if(user){
      res.status(201).json(user)
    } else{
      res.status(404).json('User Not Found')
    }
}