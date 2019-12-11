const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete()
	if(!args[0]) {
		let Embed = new Discord.RichEmbed()
		.setAuthor("EMOTY", message.guild.iconURL)
		.setColor("#003EFF")
		.setDescription(`${message.author.username} zkontroluj svoje dms!`)
		message.channel.send(Embed).then(m => m.delete(10000));
		
		var emotes = (await fs.promises.readdir("./images/gif")).map(f => f.split(".")[0]).toString().replace(/,/g, "\n");
		if(emotes.length <= 0) {
			return console.log("Couldn't find any gif files");
		}
		
		let DMEmbed = new Discord.RichEmbed()
		.setColor("#003EFF")
		.setAuthor("Filda4515 Bot EMOTY", message.guild.iconURL)
		.setThumbnail(bot.user.displayAvatarURL)
		.setTimestamp()
		.setDescription(`Tohle jsou dostupné animované emoty\nAnimované emoty zobrazíš přes příkaz ${prefix}e <emote>`)	
		.addField("Animované emoty:", `**${emotes}**`)
		.setFooter("Filda4515 Bot", bot.user.displayAvatarURL)
		 return message.author.send(DMEmbed);
	}
	let emote = args[0];
	let path = `./images/gif/${emote}.gif`
	if(!fs.existsSync(path)) return message.channel.send("Neplatný emote.").then(m => m.delete(3000));
	return message.channel.send({files: [path]});
}

module.exports.config = {
	name: "e",
	aliases: []
}