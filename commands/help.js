const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const fs = require("fs");
	const prefix = botconfig.prefix
	
	message.delete()
	let embed = new Discord.RichEmbed()
	.setAuthor("Prikaz Help", message.guild.iconURL)
	.setColor("#003EFF")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	
	fs.readdir("./images/gif", (err, files) => {
		if(err) console.log(err);
			
		let giffile = files;
		if(giffile.length <= 0) {
			return console.log("[LOGS] Couldn't find Emotes!");
		}
		
		giffile.forEach((f, i) => {
			console.log(f.split("."));
		});
	});
	
	let Sembed = new Discord.RichEmbed()
	.setColor("#003EFF")
	.setAuthor("Filda4515 Bot HELP", message.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)
	.setTimestamp()
	.setDescription(`Tohle jsou dostupné příkazy a animované emoty\nPrefix příkazů je ${prefix}\nAnimované emoty zobrazíš přes příkaz ${prefix}e <emote>\n\n**NÁPADY PIŠTE PŘES .IDEA <slohovka>**`)	
	.addField("Prikazy:", "**gachi, Gachi, gachiBASS** - Náhodný gachiBASS\n**hello, hi** - Pozdrav, test command proč tu pořád do píči je? :) Jsem líný ho smazat\n**sračka, sracka** - Prostě sračka :)")
	.addField("Animované emoty:", "**gachiBASS**\n**gachiHYPER**\n**peepoSprint**\n**TeaTime**\n**BBoomer**")
	.setFooter("Filda4515 Bot 2k19", bot.user.displayAvatarURL)
	message.channel.send(embed).then(m => m.delete(10000));
	message.author.send(Sembed)
}

module.exports.config = {
	name: "help",
	aliases: []
}