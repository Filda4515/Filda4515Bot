const botconfig = require("../botconfig.json");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (bot, message, args) => {

	const prefix = botconfig.prefix;
	
	message.delete();
	let Embed = new EmbedBuilder()
	.setAuthor({ name: "Prikaz Help", iconURL: message.guild.iconURL() })
	.setColor("#003EFF")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 5000));
	
	if(args[0] == "counting"){
		let DMEmbed = new EmbedBuilder()
		.setColor("#003EFF")
		.setAuthor({ name: "Filda4515 Bot - help command", iconURL: message.guild.iconURL()})
		.setThumbnail(bot.user.displayAvatarURL())
		.setTimestamp()
		.setTitle("Counting")
		.setDescription(".counting <subcommand>\n\n**__SUBPŘÍKAZY__**")	
		.addFields(
			{ name: "channel <#channel>", value: "- set counting channel (**ADMINISTRATOR ONLY**)"},
			{ name: "leaderboard, lb", value: "- Counting leaderboard"},
		)
		.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
		return message.author.send({ embeds: [DMEmbed] });
	}

	let DMEmbed = new EmbedBuilder()
	.setColor("#003EFF")
	.setAuthor({ name: "Filda4515 Bot - help command", iconURL: message.guild.iconURL()})
	.setThumbnail(bot.user.displayAvatarURL())
	.setTimestamp()
	.setDescription(`Tohle jsou dostupné příkazy\nPrefix příkazů je ${prefix}\n\n**nový příkaz pro nápady: .idea create**\n\n**__PŘÍKAZY__**`)	
	.addFields(
		{ name: "cad", value: "- Co si Filda4515 Bot myslí o Cadu"},
		{ name: "counting", value: "- .help counting for subcommands"},
		{ name: "e", value: "- Animované emoty:"},
		{ name: "gachi, Gachi, gachiBASS", value: "- Náhodný gachiBASS"},
		{ name: "chungus", value: "- Big Chungus"},
		{ name: "idea create", value: "- create idea ticket"},
		{ name: "isnice <number>", value: "- jak moc je dané číslo nice"},
		{ name: "koncak, končák, Koncak, Končák", value: "- Náhodný Končákův song"},
		{ name: "minigame", value: "- Spuštění minihry"},
		{ name: "sračka, sracka", value: "- Prostě sračka :)"},
		{ name: "store", value: "- FildaGames personalizovaný store + license keys"}
	)
	.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
	return message.author.send({ embeds: [DMEmbed] });
}

module.exports.config = {
	name: "help",
	aliases: []
}