var express = require('express');
var router = express.Router();
const Preferences = require('../models/preferences'); 
const User = require('../models/users'); 
const Preference = require('../models/preferences')

/* La route pour enregistrer les préférences d'un utilisateur 
   cette route est de type post
   et chaque sous document est un Object
 */
router.post('/', function(req, res) {
    const { email, regime, maladies, ingredients } = req.body ; 
    
    User.findOne({email:email})
        .then( data => {
        
         const newPreference = new Preference({
            regime:regime, 
            maladies:maladies, 
            ingredients:ingredients, 
            user:data._id
         }); 
         newPreference.save()
                      .then( () => {
                        res.json({result:true}); 
                      })
           
        })


});

module.exports = router;
