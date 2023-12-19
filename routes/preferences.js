var express = require('express');
var router = express.Router();
const Preferences = require('../models/preferences'); 
const User = require('../models/users'); 
const Preference = require('../models/preferences')


/* cette route retourne les préférences d'un utilisateur */
router.get('/:token', function(req, res ) {
    const token = req.params.token; 
    User.findOne({token:token})
        .then( user =>{
           Preference.findOne({user:user._id})
                     .then( preference => {
                        res.json({
                          regime:preference.regime,
                           maladies:preference.maladies,
                            ingredients:preference.ingredients 
                          })
                     })
                     .catch( error => {
                      res.json(error)
                     })
        } )
});


/* cette route retourne les préférences d'un utilisateur */
router.post('/regime/:token', function(req, res ) {
  const token = req.params.token; 
  const regime = req.body.regime; 
  User.findOne({token:token})
      .then( user =>{
         Preference.findOneAndUpdate({user:user._id},{regime:regime})
                   .then( data => {
                     res.json({ result:true })
                   })
                   .catch( error => {
                    res.json(error)
                   })
      } )
});

router.post('/maladies/:token', function(req, res ) {
  const token = req.params.token; 
  const maladies = req.body.maladies; 
  User.findOne({token})
      .then( user =>{
         Preference.findOneAndUpdate({user:user._id},{maladies:maladies})
                   .then( data => {
                     res.json({ result:true })
                   })
                   .catch( error => {
                    res.json(error)
                   })
      } )
});

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
