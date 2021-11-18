const gachibass = [
"https://www.youtube.com/watch?v=NdqbI0_0GsM",
"https://www.youtube.com/watch?v=UsGg0wFSkOY",
"https://www.youtube.com/watch?v=bEG_NkoA848",
"https://www.youtube.com/watch?v=PRXbT9Q_aMo",
"https://www.youtube.com/watch?v=gq3JxkARYRk",
"https://www.youtube.com/watch?v=JPxfAYYo7NA",
"https://www.youtube.com/watch?v=uo2a8zPFuh4",
"https://www.youtube.com/watch?v=y3YHnkCDnKY",
"https://www.youtube.com/watch?v=qh1nkRZ7vBc",
"https://www.youtube.com/watch?v=T3iHxLs5maM",
"https://www.youtube.com/watch?v=LSkhpg5UvHc",
"https://www.youtube.com/watch?v=SGLkRKAkXxQ",
"https://www.youtube.com/watch?v=aiEJgyGUwIk",
"https://www.youtube.com/watch?v=ub9dmKupZQw",
"https://www.youtube.com/watch?v=AnbTd2WKYdY",
"https://www.youtube.com/watch?v=CvG7KLZLs88",
"https://www.youtube.com/watch?v=aC48Cm1eWLY",
"https://www.youtube.com/watch?v=2aXqx79RUX4",
"https://www.youtube.com/watch?v=wv3eBkIyGEs",
"https://www.youtube.com/watch?v=yCNIZkvUE7E",
"https://www.youtube.com/watch?v=9cXOnIwsDcI",
"https://www.youtube.com/watch?v=CvuQOn_pMgU"
];

module.exports.run = async (bot, message, args) => {
	const randomMessage = gachibass[Math.floor(Math.random() * gachibass.length)];
	return message.channel.send(randomMessage);
}

module.exports.config = {
	name: "gachi",
	aliases: ["Gachi","gachiBASS"]
}