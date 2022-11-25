const mongoose = require("mongoose");

const guildschema = mongoose.Schema({
	_id: {
        type: String,
        required: true
    },
	Current: Number,
	LastUser: String,
    Channel: String,
	Highest: Number
})

module.exports = mongoose.model("guild", guildschema)