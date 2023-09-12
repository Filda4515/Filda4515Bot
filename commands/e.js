const botconfig = require("../botconfig.json");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete()
	if(!args[0]) {
		let Embed = new EmbedBuilder()
		.setAuthor({ name: "EMOTY", iconURL: message.guild.iconURL() })
		.setColor("#003EFF")
		.setDescription(`${message.author.username} zkontroluj svoje dms!`)
		message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 3000));
		
		var emotes = (await fs.promises.readdir("./images/gif")).map(f => f.split(".")[0]).toString().replace(/,/g, "\n");
		if(emotes.length <= 0) {
			return console.log("Couldn't find any gif files");
		}
		
		let DMEmbed = new EmbedBuilder()
		.setColor("#003EFF")
		.setAuthor({ name: "Filda4515 Bot EMOTY", iconURL: message.guild.iconURL() })
		.setThumbnail(bot.user.displayAvatarURL())
		.setTimestamp()
		.setDescription(`Tohle jsou dostupné animované emoty\nAnimované emoty zobrazíš přes příkaz ${prefix}e <emote>`)	
		.addFields({ name: "Animované emoty:", value: `**${emotes}**` })
		.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
		 return message.author.send({ embeds: [DMEmbed] });
	}
	let emote = args[0];
	let path = `./images/gif/${emote}.gif`
	if(!fs.existsSync(path)) return message.channel.send("Neplatný emote.").then(m => setTimeout(() => m.delete(), 3000));
	return message.channel.send({ files: [path] });
}

module.exports.config = {
	name: "e",
	aliases: []
}