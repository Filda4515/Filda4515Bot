const mongoose = require("mongoose");

const adventschema = mongoose.Schema({
	id: String,
	_1: Number,
	_2: Number,
	_3: Number,
	_4: Number,
	_5: Number,
	_6: Number,
	_7: Number,
	_8: Number,
	_9: Number,
	_10: Number,
	_11: Number,
	_12: Number,
	_13: Number,
	_14: Number,
	_15: Number,
	_16: Number,
	_17: Number,
	_18: Number,
	_19: Number,
	_20: Number,
	_21: Number,
	_22: Number,
	_23: Number,
	_24: Number
})

module.exports = mongoose.model("advent", adventschema)