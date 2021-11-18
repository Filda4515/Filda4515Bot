const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete();
	
	if(message.author.id != '356168492942229506') return message.channel.send("Nemáš oprávnění");
	
	let Embed = new Discord.RichEmbed()
		.setAuthor("Filda4515 BOT POLL", message.guild.iconURL)
		.setColor("#003EFF")
		.setDescription(message.content.slice(prefix.length+4+1))
	message.channel.send(Embed).then(async m => {
		try {
			await m.react("👍");
			await m.react("👎");
		} catch (error) {
			console.error("One of the emojis failed to react");
		}
	})
}

module.exports.config = {
	name: "poll",
	aliases: []
}