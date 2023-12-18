const mongoose = require('mongoose'); 

const menuSchema = mongoose.Schema({
    dish_name:String,
    dish_type:String, 
    dish_description:String,
    dish_category:String, 
    price:Number, 
    distane:Number,
    note:Number,
    ingredients:[{name:String}]
})
const PlaceSchema = mongoose.Schema({
    place_name:String, 
    adresse:String, 
    place_image:String, 
    place_type:String, 
    longitude:Number, 
    latitude:Number,
    distance:Number, 
    note:Number, 
    menus:[menuSchema]
}); 

const Place = mongoose.model('places',PlaceSchema); 


module.exports = Place 