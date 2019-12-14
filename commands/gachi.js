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
"https://www.youtube.com/watch?v=aiEJgyGUwIk"
];

module.exports.run = async (bot, message, args) => {
	const randomMessage = gachibass[Math.floor(Math.random() * gachibass.length)];
	return message.channel.send(randomMessage);
}

module.exports.config = {
	name: "gachi",
	aliases: ["Gachi","gachiBASS"]
}