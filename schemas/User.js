const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
	Guild: String,
    Counts: Number
})

module.exports = mongoose.model("user", userschema)