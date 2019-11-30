const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	return message.channel.send("Hello");
}

module.exports.config = {
	name: "hello",
	aliases: ["hi"]
}