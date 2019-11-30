const Discord = require("discord.js");
const rando_imgs = [
'https://www.youtube.com/watch?v=NdqbI0_0GsM&',
'https://www.youtube.com/watch?v=UsGg0wFSkOY',
'https://www.youtube.com/watch?v=bEG_NkoA848',
'https://www.youtube.com/watch?v=PRXbT9Q_aMo',
'https://www.youtube.com/watch?v=gq3JxkARYRk',
'https://www.youtube.com/watch?v=JPxfAYYo7NA',
'https://www.youtube.com/watch?v=uo2a8zPFuh4',
'https://www.youtube.com/watch?v=y3YHnkCDnKY',
'https://www.youtube.com/watch?v=qh1nkRZ7vBc'
];

module.exports.run = async (bot, message, args) => {
	const randomMessage = rando_imgs[Math.floor(Math.random() * rando_imgs.length)];
	return message.channel.send(randomMessage);
}

module.exports.config = {
	name: "gachi",
	aliases: ["Gachi","gachiBASS"]
}