const Discord = require("discord.js");
const Guild = require("../schemas/Guild.js");
const User = require("../schemas/User.js");

module.exports.run = async (bot, message, args) => {
	if(args[0] == "channel") {
		if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Musíš být ADMINISTRATOR.");
		const channel = message.mentions.channels.first();
		if(!channel) return message.reply("Napiš counting channel.");
		
		Guild.findOne({
			id: message.guild.id
		}, async(err, data) => {
			if(err) throw err;
			if(data) {
				data.Channel = channel.id
			} else {
				data = new Guild({
					id: message.guild.id,
					Current: 0,
                    Channel: channel.id,
					Highest: 0
				})
			}
			data.save();
			message.reply("Counting channel byl nastaven na " + channel.toString());
		});
		return;
	}
	if(args[0] ==  "leaderboard" || args[0] ==  "lb") {
		User.find({
			Guild: message.guild.id
		}, async(err, data) => {
			if(err) throw err;
			const sort = data.sort((a, b) => b.Counts - a.Counts);
			let i = 1;
			const array = sort.slice(0,5).map((v) => `**#${i++}** <@${v.id}>, **${v.Counts}**`).join("\n");
			
			const g_data = await Guild.findOne({ id: message.guild.id });
			
			let Embed = new Discord.MessageEmbed()
			.setColor("#003EFF")
			.setTitle(`Leaderbord na \`${message.guild.name}\`\nNejvyšší dosažené číslo na serveru: ${g_data.Highest}\n`)
			.setDescription(array)
			message.channel.send({ embeds: [Embed] });
		})
		return;
	}
	
	return message.channel.send(".help counting for subcommands");
}

module.exports.config = {
	name: "counting",
	aliases: []
}