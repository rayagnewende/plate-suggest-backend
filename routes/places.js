var express = require('express');
var router = express.Router();
const Preference = require('../models/preferences'); 
const Place = require('../models/places'); 
const User = require('../models/users')
/*  */
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
                        // console.log(data);
                           for(const plat of plats )
                           {
                               if(plat.dish_type.toLowerCase() === data.regime.toLowerCase()
                                || (data.regime.toLowerCase() === "Flexitarien" && plat.dish_type.toLowerCase() === "Vegetarien") ||
                                  (data.regime.toLowerCase() === "Mange tout" && 
                                  (plat.dish_type.toLowerCase() === "Vegetarien" || plat.dish_type.toLowerCase() === "Flexitarien"))
                                  )
                               {
                        
                                  platsfiltres.push(plat)
                               
                               }
                           
                           }
                         //  res.json({platsfiltres})

                          data.ingredients.map( ingredient => {
                             platsfiltres.map( element => {
                                    let bool = false; 
                               element.ingredients.map( sousEl => {
                                 
                                      if(sousEl.name.toLowerCase() === ingredient.ingredient_name.toLowerCase())
                                      {
                                        bool = true
                                      }
                               })
                             // console.log(bool);
                               if(bool === false){
                                   if(platsFinal.find(newEl => newEl.dish_name === element.dish_name) === undefined){
                                    platsFinal.push(element)
                                   }
                               }
                             })
                          })
                         res.json({result:true, nombreDePlats:platsFinal.length, plats:platsFinal}); 
                         }); 
            
                        
        })



        })

       
}); 

module.exports = router;
