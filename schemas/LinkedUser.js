const mongoose = require("mongoose");

const linkeduserschema = mongoose.Schema({
	id: String,
	system_id: String,
})

module.exports = mongoose.model("linkeduser", linkeduserschema)