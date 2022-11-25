const Guild = require("../schemas/Guild.js");

module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Musíš být ADMINISTRATOR.");
	if(args[0] == "channel")
	{
		const channel = message.mentions.channels.first();
		if(!channel) return message.reply("Napiš counting channel.");
		
		Guild.findOne({
			_id: message.guild.id
		}, async(err, data) => {
			if(err) throw err;
			if(data) {
				data.Channel = channel.id
			} else {
				data = new Guild({
					_id: message.guild.id,
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
		
	return message.channel.send("Counting coming soon");
}

module.exports.config = {
	name: "counting",
	aliases: []
}