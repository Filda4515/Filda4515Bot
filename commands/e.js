const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	
	message.delete()
	if(!args[0]) return message.channel.send("Nezadal jsi žádný emote.").then(m => m.delete(3000));
	let emote = args[0];
	let path = `./images/gif/${emote}.gif`
	if(!fs.existsSync(path)) return message.channel.send("Neplatný emote.").then(m => m.delete(3000));
	return message.channel.send({files: [path]});
}

module.exports.config = {
	name: "e",
	aliases: []
}