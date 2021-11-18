const koncaklist = [
"https://www.youtube.com/watch?v=UQJoeTZTdu0",
"https://www.youtube.com/watch?v=J09nlPNdxYc",
"https://www.youtube.com/watch?v=FVxTs7nJI7I",
"https://www.youtube.com/watch?v=QSy7-SB3LtA",
"https://www.youtube.com/watch?v=Q-j2sYyDKrI",
"https://www.youtube.com/watch?v=dyrVVPt22qA",
"https://www.youtube.com/watch?v=oxAaq_t0U-E"
];

module.exports.run = async (bot, message, args) => {
	const randomMessage = koncaklist[Math.floor(Math.random() * koncaklist.length)];
	return message.channel.send(randomMessage);
}

module.exports.config = {
	name: "koncak",
	aliases: ["Končák","Koncak","končák"]
}