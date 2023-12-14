var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:user_id', function(req, res ) {
   const  user_id = req.params.user_id;
   Preferences.findOne({ _id:user_id})
});

module.exports = router;
