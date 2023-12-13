var express = require('express');
var router = express.Router();
const Preferences = require('../models/preferences'); 
const User = require('../models/users'); 

/* GET home page. */
router.post('/:username', function(req, res, next) {
    const { regime, maladies, ingredients } = req.body ; 
    
    


});

module.exports = router;
