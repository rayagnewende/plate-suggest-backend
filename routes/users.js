var express = require('express');
const { checkIfEmailExist } = require('../modules/checkIfEmailExist');
const { checkIfUserExist } = require('../modules/checkIfUserExist');
const User = require('../models/users');
var router = express.Router();
const uid2 = require("uid2"); 
const bcrypt = require('bcrypt'); 

// cette route permet de créer un nouveau compte

router.post('/signup', (req, res) => {
  const { username, email, password} = req.body ; 
  const hash = bcrypt.hashSync(password, 10);
  const token = uid2(32); 
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 


  User.find()
      .then( users => {

          if( !email || !password || email==='' || password==='')
          {
              res.json({ result:false, error:'Il existe des champs vide' }); 
          }
          else if( checkIfEmailExist(email, users))
          {
              res.json({ result: false, error: 'Email existe déjà' })
          }
          else if(!EMAIL_REGEX.test(email))
          {
            res.json({ result: false, error: "L'email n'est pas valide" })
          }
          else {
              const newUser = new User({
                  username,
                  email,
                  password:hash, 
                  token:token
              }); 

              newUser.save() 
              res.json({ result:true, token:token}); 
          }
     
      });
}); 



// cette route permet à un utilisateur de se connecter 
router.post('/signin', (req, res) => {

  const { email, password} = req.body ; 

  User.findOne({ email: email }).then(data => {
    if (data && bcrypt.compareSync(password, data.password)) {
      res.json({ result: true,token:data.token });
    } else {
      res.json({ result: false });
    }
});
  
})



module.exports = router;
