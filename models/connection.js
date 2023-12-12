const mongoose = require('mongoose'); 

const CONNECTION_STRING = process.env.CONNECTION_STRING; 

mongoose.connect(CONNECTION_STRING,{connectTimeoutMS:2000})
        .then( () => {
            console.log("DATABASE IS CONNECTED!");
        })
        .catch(error => {
            console.log(error);
        })