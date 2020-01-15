const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	if(message.author.id != '356168492942229506') return message.channel.send("Nemáš oprávnění");

	let id = args[0].slice(2, args[0].length-1);
	if(args[0].slice(1, 2) == "#") return bot.channels.get(id).send(message.content.slice(prefix.length+5+1+args[0].length+1));
	if(args[0].slice(1, 2) == "@") return message.mentions.members.first().send(message.content.slice(prefix.length+5+1+args[0].length+1));
}

module.exports.config = {
	name: "admin",
	aliases: []
}