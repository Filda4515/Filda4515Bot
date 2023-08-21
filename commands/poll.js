const botconfig = require("../botconfig.json");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete();
	
	if(message.author.id != '356168492942229506') return message.channel.send("Nemáš oprávnění");
	
	if(!args[0]) return message.channel.send("Nenapsal jsi zprávu");
	
	let Embed = new EmbedBuilder()
		.setColor("#003EFF")
		.setAuthor({ name: "Filda4515 Bot - poll", iconURL: message.guild.iconURL()})
		.setDescription(message.content.slice(prefix.length+4+1))
	message.channel.send({ embeds: [Embed] }).then(async m => {
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