const botconfig = require("../botconfig.js");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	if(message.author.id != '356168492942229506') return message.channel.send("Nemáš oprávnění");

	let id = args[0].slice(2, args[0].length-1);
	bot.channels.get(id).send(message.content.slice(prefix.length+7+args[0].length)).catch();
}

module.exports.config = {
	name: "admin",
	aliases: []
}