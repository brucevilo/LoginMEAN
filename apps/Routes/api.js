var User = require('../Model/User');


module.exports = function(router) {
    // registratio
    router.post('/user', function (req, res) { 
        var userData = new User();
        userData.username = req.body.username;
        userData.password = req.body.password;
        userData.email = req.body.email;
        if (req.body.email == null || req.body.email == '' || req.body.username == null || req.body.username == '' ||
            req.body.password == '' || req.body.password == null) {
            res.json({success: false, message:'Ensure username,email and password'});
        } else {
            userData.save(function (err) {
                if (err) {
                    res.json({success: false , message:'Username or Email already exist'});
                } else
                    res.json({success: true, message: 'User Created!'});
            });

        }
    });
    // LOGIN
    router.post('/authenticate', function(req, res) {
        User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
            if (err) throw err;
  
            if (!user) {
                res.json({ success: false, message: 'Could not authenticate' });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({ success: false, message: 'Could not validate Password' });
                    } else {
                        res.json({ success: true, message: 'User Authenticate' });
                    }
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
            }
        });
    });



    return router;
}