const User = require('../models/User.js');


exports.login = async (req,res) => {


    const users = await User.find();

    module.exports = (req, res, next) => {
        User.findById(req.session.userID, (err, user) => {
            if (err || !user) {
                return res.redirect('/');
            }
            next();
        })
    }        

    if(users[0].userName == req.body.userName && users[0].userPass == req.body.userPass){
        req.session.userID = users[0]._id;
       
        res.status(200).redirect('admin');
    }else{
        res.status(200).redirect('/');
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}