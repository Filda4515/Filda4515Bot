const botconfig = require("../botconfig.json");
const { EmbedBuilder, ChannelType, PermissionsBitField  } = require("discord.js");

module.exports.run = async (bot, message, args) => {

	if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
		if (args[0] == "close"){
			if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("Musíš být Administrator.").then(m => setTimeout(() => m.delete(), 5000));
			const name = message.channel.name;
			const parts = name.split("-");
			if (parts.length > 1) {
				if (parts[0] != "idea") return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
				const user_id = parts[1];
				if (isNaN(user_id)) return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
				try {
					const user = await bot.users.fetch(user_id);
					let DMEmbed = new EmbedBuilder()
					.setColor("#003EFF")
					.setAuthor({ name: "Filda4515 Bot IDEA", iconURL: message.guild.iconURL()})
					.setThumbnail(bot.user.displayAvatarURL())
					.setTimestamp()
					.setDescription("Děkujeme za váš nápad!\nPokud chcete napsat další, neváhejte použít .idea create.")
					.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
					if (args[1] == "accept") DMEmbed.addFields({ name: "Idea info:", value: "Váš nápad byl schválen a bude brzy implementován.\nDěkujeme za váš čas." })
					if (args[1] == "deny") DMEmbed.addFields({ name: "Idea info:", value: "Váš nápad byl bohužel zamítnut.\nDěkujeme za váš čas." })
					message.channel.delete();
					return user.send({ embeds: [DMEmbed] });
				} catch (error) {
					return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
				}
			} else {
				return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
			}
		}
	}
	
	message.delete()
	if(args[0] == "create") {
		message.guild.channels.create({
			name: `idea - ${message.author.id}`,
			type: ChannelType.GuildText,
			parent: "651779743594577948",
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone,
					deny: [PermissionsBitField.Flags.ViewChannel],
				},
				{
					id: message.author.id,
					allow: [PermissionsBitField.Flags.ViewChannel],
				},
			],
		}).then(channel => channel.send(`<@356168492942229506>\nUser: <@${message.author.id}>\nPlease write your idea below.`))
		.catch(console.error);
		return
	}
	return message.channel.send("Pro vytvoření nápadu použij příkaz: .idea create").then(m => setTimeout(() => m.delete(), 5000));
}

module.exports.config = {
	name: "idea",
	aliases: ["IDEA"]
}