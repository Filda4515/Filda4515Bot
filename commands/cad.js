const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	return message.channel.send("Cad je sračka!");
}

module.exports.config = {
	name: "cad",
	aliases: []
}