const botconfig = require("../botconfig.json");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const prefix = botconfig.prefix;
	
	let channel = bot.channels.cache.get("651796243181469696");
	
	message.delete()
	if(!args[0]) return message.channel.send("Nenapsal jsi žádný nápad.").then(m => {
		setTimeout(() => m.delete(), 3000)
	});
	if(message.member.permissions.has('ADMINISTRATOR')) {
		
		mention = message.mentions.members.first();
		
		if(args[0] === "accept") {
			let Aembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: "Filda4515 Bot IDEA", iconURL: message.guild.iconURL() })
				.setThumbnail(bot.user.displayAvatarURL())
				.setTimestamp()
				.setDescription(message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1))
				.addFields({ name: "Ticket info:", value: "Tvůj nápad byl schválen a bude brzy implementován.\nPokud máte více nápadů, nebojte se nám je sdělit přes .idea <nápad>\nDěkujeme za váš čas." })
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			mention.send({ embeds: [Aembed] });
			let Bembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1) })
				.setDescription("Nápad byl schválen.")
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			return channel.send({ embeds: [Bembed] });
		} else if(args[0] === "reason") {
			let Aembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: "Filda4515 Bot IDEA", iconURL: message.guild.iconURL() })
				.setThumbnail(bot.user.displayAvatarURL())
				.setTimestamp()
				.setDescription("Tvůj nápad byl zamítnut:")
				.addFields({ name: "Důvod zamítnutí:", value: message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1) })
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			mention.send({ embeds: [Aembed] });
			let Bembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: "Důvod byl poslán" })
				.setDescription(message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1))
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			return channel.send({ embeds: [Bembed] });
		} else if(args[0] === "deny") {
			let Aembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: "Filda4515 Bot IDEA", iconURL: message.guild.iconURL() })
				.setThumbnail(bot.user.displayAvatarURL())
				.setTimestamp()
				.setDescription(message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1))
				.addFields({ name: "Ticket info:", value: "Tvůj nápad byl bohužel zamítnut.\nPokud si myslíš, že by měl být povolen, vytvoř prosím znovu nápad přes .idea <nápad> a popiš podrobnosti proč by měl být tvůj návrh přijat." })
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			mention.send({ embeds: [Aembed] });
			let Bembed = new EmbedBuilder()
				.setColor("#003EFF")
				.setAuthor({ name: message.content.slice(prefix.length+4+1+args[0].length+1+args[1].length+1), value: "\u200B" })
				.setDescription("Nápad byl zamítnut.")
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
			return channel.send({ embeds: [Bembed] });
		}
	}
	
	const Embed = new EmbedBuilder()
		.setColor("#003EFF")
		.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
		.setDescription(message.content.slice(prefix.length+5))
		.setFooter({ text: "Návrh pro bota || .idea accept @user <napad> / reason @user <reason> / deny @user <napad>" })
	return channel.send({ embeds: [Embed] });
}

module.exports.config = {
	name: "idea",
	aliases: ["IDEA"]
}