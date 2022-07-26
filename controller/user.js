const con =require('../database/db')

const user = require('../routes/user');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

// "username": "usman",
//     "email": "cdf@gmail.com",
//     "password": "1234",
//     "description": "BcryptPassword",
//     "profilePicture":"url",
//     "nooffollowers": 0,
//     "nooffollowing":"0"
// Register User
exports.register = async function(req, res) {

    const salt =10;
    const pass = req.body.password
    const cyptedPass = await bcrypt.hash(pass,salt)
    var sql = "Insert into user (username, email,password,description,profilepicture,nooffollowers,nooffollowing) VALUES ("+'\"'+req.body.username+'\"'+'\,'+'\"'+req.body.email+'\"'+'\,'+'\"'+cyptedPass+'\"'+'\,'+'\"'+req.body.description+'\"'+'\,'+'\"'+req.body.profilepicture+'\"'+'\,'+req.body.nooffollowers+'\,'+req.body.nooffollowing+")";
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Record Created");
        res.send("Record Inserted")
      });
};

//Login
exports.Login = function(req,res)
{
    var sql = "SELECT username FROM user WHERE email ="+'\''+req.body.email+'\''+ " AND "+"password="+'\''+req.body.password+'\'';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.description);
        res.send("Loged In")
      });
};

//Change Password
exports.ChangePassword = function(req,res)
{
    var sql = "Update user set password ="+ '\''+req.body.newpassword+'\''+ "WHERE email ="+'\''+req.body.email+'\''+ " AND "+"password="+'\''+req.body.password+'\'';
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Password Changed");
        res.send("Password Changed")
      });
};

//Forget Password
exports.ForgetPass = function(req,res)
{
    

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'umirz87@gmail.com',
    pass: 'euztreclrlfkldbt'
    }
    });

    var receiver_email=""+req.body.email
    console.log(receiver_email)
    var mailOptions = {
    from: 'umirz87@gmail.com',
    to: receiver_email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 

};
