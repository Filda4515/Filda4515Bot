const botconfig = require("../botconfig.js");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete()
	if(!args[0]) return message.channel.send("Nenapsal jsi žádný nápad.").then(m => m.delete(3000));
	
	const Embed = new Discord.RichEmbed()
		.setColor("#003EFF")
		.setAuthor(message.author.tag, message.author.displayAvatarURL)
		.setDescription(message.content.slice(prefix.length+5))
		.setFooter("Návrh pro bota")
	const channel = bot.channels.find("name", "owner")
	channel.send(Embed)

}

module.exports.config = {
	name: "idea",
	aliases: []
}