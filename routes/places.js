var express = require('express');
var router = express.Router();
const Preference = require('../models/preferences'); 
const Place = require('../models/places'); 
/*  */
router.get('/:id', async function(req, res ) {
    const  id = req.params.id;
    let  plats=[]; 
    let platsfiltres=[]; 
    let platsFinal= [];
   Place.find()
         .then( restaurants => {
            restaurants.map( data => {
                plats = [...plats, ...data.menus,]
            })
            // selectionner les préferences et faire le fitrage en fonction des préférences de l'utilisateur
            Preference.findOne({ user:id})
                        .then( data => {
                       
                           for(const plat of plats )
                           {
                               if(plat.dish_type.toLowerCase() === data.regime.toLowerCase() || 
                                  (data.regime.toLowerCase() === "Flexitarien" && plat.dish_type.toLowerCase() === "Végétarien") ||
                                  (data.regime.toLowerCase() === "Mange tout" && 
                                  (plat.dish_type.toLowerCase() === "Végétarien" || plat.dish_type.toLowerCase() === "Flexitarien")))
                               {
                                  platsfiltres.push(plat)
                               
                               }
                           
                           }
                        //   res.json({platsfiltres})

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
                         
                         }); 
            
                        
        })
       
}); 

module.exports = router;
