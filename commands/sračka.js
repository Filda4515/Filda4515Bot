module.exports.run = async (bot, message, args) => {
	return message.channel.send("Protokoly do ELMc jsou sračka!");
}

module.exports.config = {
	name: "sračka",
	aliases: ["sracka"]
}