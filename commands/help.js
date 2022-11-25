const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	const prefix = botconfig.prefix;
	
	message.delete()
	let Embed = new Discord.MessageEmbed()
	.setAuthor({ name: "Prikaz Help", iconURL: message.guild.iconURL() })
	.setColor("#003EFF")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	message.channel.send({ embeds: [Embed] }).then(m => m.delete(10000));

	let DMEmbed = new Discord.MessageEmbed()
	.setColor("#003EFF")
	.setAuthor({ name: "Filda4515 Bot - help command", iconURL: message.guild.iconURL()})
	.setThumbnail(bot.user.displayAvatarURL)
	.setTimestamp()
	.setDescription(`Tohle jsou dostupné příkazy\nPrefix příkazů je ${prefix}\n\n**NÁPADY PIŠTE PŘES .IDEA <slohovka>**\n\n**__PŘÍKAZY__**`)	
	.addFields(
		{ name: "e", value: "- Animované emoty:"},
		{ name: "gachi, Gachi, gachiBASS", value: "- Náhodný gachiBASS"},
		{ name: "cad", value: "- Co si Filda4515 Bot myslí o Cadu"},
		{ name: "sračka, sracka", value: "- Prostě sračka :)"},
	)
	.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
	message.author.send({ embeds: [DMEmbed] });
}

module.exports.config = {
	name: "help",
	aliases: []
}