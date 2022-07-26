const express =require('express')
const router = express.Router()
const user =require('../controller/user')

//Login
router.post('/login',(req,res) =>
{
   user.Login(req,res)
})

//Registration
router.post('/register',(req,res) =>
{
   user.register(req,res)
})

//Change Password
router.post('/changepass',(req,res) =>
{
   user.ChangePassword(req,res)
})

//Forget Password
router.post('/forgetPass',(req,res)=>
{
   user.ForgetPass(req,res)
})


module.exports = router