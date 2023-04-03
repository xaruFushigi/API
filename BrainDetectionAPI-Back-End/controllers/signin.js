const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body; // destructure email and password
    //checking for specific request when filling email, name, and password fields in registration form
    if(!email || !password) {
        return res.status(400).json('incorrect for, submission')
     }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
          const isValid =  bcrypt.compareSync(password, data[0].hash);
          if(isValid){
              db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user', err))
          }
          else {
            res.status(400).json('wrong credentials')
          }
        })
};

module.exports = {
    handleSignIn: handleSignIn
};