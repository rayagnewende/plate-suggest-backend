const mongoose = require('mongoose'); 

const PlaceSchema = mongoose.Schema({
    place_name:String, 
    adresse:String, 
    place_image:String, 
    place_type:String, 
    longitude:Number, 
    latitude:Number
}); 

const Place = mongoose.model('places',PlaceSchema); 


module.exports = { Place }