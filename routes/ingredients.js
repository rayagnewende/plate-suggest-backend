var express = require('express');
var router = express.Router();
const Ingredients = require('../models/ingredients'); 

/* GET home page. */
router.get('/', function(req, res ) {
   Ingredients.find() 
              .then( ingredients => {
                res.json({ingredients})
              })
});


router.get('/:name', function(req, res ) {
    
    Ingredients.find({name:{$regex:req.params.name, $options:'i'}}) 
               .then( ingredients => {
                 res.json({ingredients})
               })
 });


module.exports = router;
