const mongoose = require("mongoose");

const elitaschema = mongoose.Schema({
    // The user ID
    _id: {
        type: String,
        required: true
    },
    
    //elita progress
    elitaprogress: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("elita", elitaschema)