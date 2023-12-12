var express = require('express');
var router = express.Router();
const Preferences = require('../models/preferences'); 

/* GET home page. */
router.post('/:username', function(req, res, next) {
    const { regime } = req.body ; 
    


});

module.exports = router;
