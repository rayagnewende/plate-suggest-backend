var express = require('express');
var router = express.Router();
const Preference = require('../models/preferences'); 
const Place = require('../models/places'); 
/*  */
router.get('/:id', async function(req, res ) {
     const  id = req.params.id;
//    Preference.findOne({ user:user_id})
//               .then( data => {
                
//                 console.log(data); }); 
let  plats=[]; 
let platsfiltres=[]; 
let platsFinal= [];
   Place.find()
         .then( restaurants => {
            restaurants.map( data => {
                plats = [...plats, ...data.menus]
            })
            Preference.findOne({ user:id})
                        .then( data => {
                           for(const plat of plats )
                           {
                               if(plat.dish_type.toLowerCase() === data.regime.toLowerCase())
                               {
                                  platsfiltres.push(plat)
                               
                               }
                           
                           }
                           //res.json({platsfiltres})
                        //   data.ingredients.map( ingredient => {
                        //      platsfiltres.map( element => {
                        //        element.ingredients.map( sousEl => {
                        //               if(sousEl.name !== ingredient.ingredient_name)
                        //               {
                        //                 platsFinal.push(element)
                        //               }
                        //        })
                                
                        //      })
                        //   })
                          res.json({result:true,nombreDePlats:platsfiltres.length, plats:platsfiltres})
                         }); 
            
                        
        })
       
}); 

module.exports = router;
