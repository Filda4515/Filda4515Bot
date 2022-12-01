const mongoose = require("mongoose");

const guildschema = mongoose.Schema({
	id: String,
	Current: Number,
	LastUser: String,
	LastMessage: String,
	Channel: String,
	Highest: Number
})

module.exports = mongoose.model("guild", guildschema)