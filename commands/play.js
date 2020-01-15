const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
	if (!message.member.voiceChannel) return message.channel.send("Připoj se do voice channelu.");
	if (message.guild.me.voiceChannel) return message.channel.send("Bot je už připojený.");
	if (!args[0]) return message.channel.send("Nevložili jste URL.");

	let validate = await ytdl.validateURL(args[0]);
	if (!validate) return message.channel.send("Vlož **platnou** URL.");
	
	let info = await ytdl.getInfo(args[0]);
	let connection = await message.member.voiceChannel.join();
	let dispatcher = await connection.playStream(ytdl(args[0], { filter: "audioonly" }));
	
	message.channel.send(`Právě hraje: ${info.title}`);
}

module.exports.config = {
	name: "play",
	aliases: []
}