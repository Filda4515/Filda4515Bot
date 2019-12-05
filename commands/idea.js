const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	message.delete()
	if(!args[0]) return message.channel.send("Nenapsal jsi žádný nápad.").then(m => m.delete(3000));
	if(message.author.id === '356168492942229506') {
		
		mention = message.mentions.members.first();
		console.log(mention);
		
		if(args[0] === "confirm") {
			let Aembed = new Discord.RichEmbed()
				.setColor("#003EFF")
				.setAuthor("Filda4515 Bot IDEA", message.guild.iconURL)
				.setThumbnail(bot.user.displayAvatarURL)
				.setTimestamp()
				.addField("Ticket info:", "Tvůj nápad byl povolen a bude brzy implementován.\nPokud máte více nápadů, nebojte se nám je sdělit přes .idea <nápad>\nDěkujeme za váš čas.")
				.setFooter("Filda4515 Bot", bot.user.displayAvatarURL)
			return mention.sendMessage (Aembed);
		} else if(args[0] === "deny") {
			let Aembed = new Discord.RichEmbed()
				.setColor("#003EFF")
				.setAuthor("Filda4515 Bot IDEA", message.guild.iconURL)
				.setThumbnail(bot.user.displayAvatarURL)
				.setTimestamp()
				.addField("Ticket info:", "Tvůj nápad byl bohužel zamítnut.\nPokud si myslíš, že by měl být povolen, vytvoř prosím znovu ticket přes .idea <nápad> a popiš podrobnosti proč by měl být tvůj návrh přijat.")
				.setFooter("Filda4515 Bot", bot.user.displayAvatarURL)
			return mention.sendMessage (Aembed);
		}
	}
	
	let guild = bot.guilds.get("510138523421114368");
	//guild.createChannel(`${message.author.username}-${message.author.discriminator}`, "text", {"READ_MESSAGES": false}).then(channel => {channel.setParent(category)});
	//channel = message.guild.channels.find(channel => channel.name === `${message.author.username}-${message.author.discriminator}`);
	
	const Embed = new Discord.RichEmbed()
		.setColor("#003EFF")
		.setAuthor(message.author.tag, message.author.displayAvatarURL)
		.setDescription(message.content.slice(prefix.length+5))
		.setFooter("Návrh pro bota || .idea confirm @user/ .idea deny @user")
	let channel = guild.channels.find(c => c.name == "ideas")
	channel.send(Embed);
}

module.exports.config = {
	name: "idea",
	aliases: []
}