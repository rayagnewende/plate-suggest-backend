const mongoose = require('mongoose'); 

const PlateSchema = mongoose.Schema({
    plate_name:String, 
    price:String, 
    plate_image:String, 
    restaurant:{type:mongoose.Schema.Types.ObjectId, ref:"restaurants"}
}); 

const Plate = mongoose.model('plates',PlateSchema ); 


module.exports = { Plate , PlateSchema}