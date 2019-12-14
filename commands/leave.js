module.exports.run = async (bot, message, args) => {
	if (message.author.id != '356168492942229506') return;
	if (!message.member.voiceChannel) return message.channel.send("Připoj se do voice channelu.");
	if (!message.guild.me.voiceChannel) return message.channel.send("Bot není připojený.");
	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Nejsi připojen ve stejném voice channelu.");
	
	message.guild.me.voiceChannel.leave();

	message.channel.send("Odpojování ...");
}

module.exports.config = {
	name: "leave",
	aliases: []
}