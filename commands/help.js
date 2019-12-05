const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

const fs = require("fs").promises;

module.exports.run = async (bot, message, args) => {

	const prefix = botconfig.prefix
	
	message.delete()
	let embed = new Discord.RichEmbed()
	.setAuthor("Prikaz Help", message.guild.iconURL)
	.setColor("#003EFF")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	
	var emotes = (await fs.readdir("./images/gif")).map(f => f.split(".")[0]);
	if(emotes.length <= 0) {
		return console.log("Couldn't find any gif files");
	}
	
	let Sembed = new Discord.RichEmbed()
	.setColor("#003EFF")
	.setAuthor("Filda4515 Bot HELP", message.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)
	.setTimestamp()
	.setDescription(`Tohle jsou dostupné příkazy a animované emoty\nPrefix příkazů je ${prefix}\nAnimované emoty zobrazíš přes příkaz ${prefix}e <emote>\n\n**NÁPADY PIŠTE PŘES .IDEA <slohovka>**`)	
	.addField("Prikazy:", "**gachi, Gachi, gachiBASS** - Náhodný gachiBASS\n**cad** - Co si Filda4515 Bot myslí o Cadu\n**sračka, sracka** - Prostě sračka :)")
	.addField("Animované emoty:", `**${emotes}**`)
	.setFooter("Filda4515 Bot", bot.user.displayAvatarURL)
	message.channel.send(embed).then(m => m.delete(10000));
	message.author.send(Sembed)
}

module.exports.config = {
	name: "help",
	aliases: []
}