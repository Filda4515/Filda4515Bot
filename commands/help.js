const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	const prefix = botconfig.prefix;
	
	message.delete()
	let Embed = new Discord.RichEmbed()
	.setAuthor("Prikaz Help", message.guild.iconURL)
	.setColor("#003EFF")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	message.channel.send(Embed).then(m => m.delete(10000));

	let DMEmbed = new Discord.RichEmbed()
	.setColor("#003EFF")
	.setAuthor("Filda4515 Bot HELP", message.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)
	.setTimestamp()
	.setDescription(`Tohle jsou dostupné příkazy\nPrefix příkazů je ${prefix}\n\n**NÁPADY PIŠTE PŘES .IDEA <slohovka>**`)	
	.addField("Prikazy:", "**e** - Animované emoty\n**gachi, Gachi, gachiBASS** - Náhodný gachiBASS\n**cad** - Co si Filda4515 Bot myslí o Cadu\n**sračka, sracka** - Prostě sračka :)")
	.setFooter("Filda4515 Bot", bot.user.displayAvatarURL)
	message.author.send(DMEmbed);
}

module.exports.config = {
	name: "help",
	aliases: []
}