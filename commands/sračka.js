const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	return message.channel.send("https://www.spszl.cz/modules/wfdownloads/singlefile.php?cid=84&lid=1447");
}

module.exports.config = {
	name: "sračka",
	aliases: ["sracka"]
}