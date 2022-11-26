const mongoose = require("mongoose");

const userschema = mongoose.Schema({
	id: String,
	Guild: String,
	Counts: Number
})

module.exports = mongoose.model("user", userschema)