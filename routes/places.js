var express = require('express');
var router = express.Router();
const Preference = require('../models/preferences'); 
const Place = require('../models/places'); 
const User = require('../models/users');
const { checkIfElementExistsInArray } = require('../modules/checkElementExistsInArray');
const { shuffleArray } = require('../modules/suffleArray');




// cette route retourne la liste des restaurants et magasins à proximité 
router.get('/', async  function(req, res ) {
  const places =  await Place.find(); 
  res.json({places:places})

}); 

/*  cette route permet de faire la requete  */
router.get('/:token', async function(req, res ) {
    const  token = req.params.token;
    let  plats=[]; 
    let platsfiltres=[]; 
    let platsFinal= [];
    
    User.findOne({token:token})
        .then( user => {


         Place.find()
         .then( restaurants => {
            restaurants.map( data => {
                plats = [...plats, ...data.menus,]
            })
            // selectionner les préferences et faire le fitrage en fonction des préférences de l'utilisateur
            Preference.findOne({ user:user._id})
                        .then( data => {
                           for(const plat of plats )
                           {
                               if(plat.dish_type.toLowerCase() === data.regime.toLowerCase()
                                || (data.regime.toLowerCase() === "flexitarien" && plat.dish_type.toLowerCase() === "vegetarien") ||
                                  (data.regime.toLowerCase() === "mange tout" && 
                                  (plat.dish_type.toLowerCase() === "vegetarien" || plat.dish_type.toLowerCase() === "flexitarien"))
                                  )
                               {
                        
                                  platsfiltres.push(plat)
                               
                               }
                           
                           }
                         //  res.json({platsfiltres})

                         data.ingredients.length > 0 ? data.ingredients.map( ingredient => {
                           platsfiltres.map( element => {
                                  let bool = false; 
                             element.ingredients.map( sousEl => {
                  
                                    if(sousEl.name.toLowerCase().includes(ingredient.ingredient_name.toLowerCase()))
                                    {
                                      bool = true
                                    }
                             })
                             console.log(bool);
                             if(bool === false ){
                                if(!checkIfElementExistsInArray(element, platsFinal))
                                {
                                     platsFinal.push(element); 
                                }
                             }

                           })
                        }) : platsFinal = [...platsfiltres]
                         platsFinal = shuffleArray(platsFinal); 
                         res.json({result:true, nombreDePlats:platsFinal.length, plats:platsFinal}); 
                         }); 
            
                        
        })


        })

       
}); 

module.exports = router;
