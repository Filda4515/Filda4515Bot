const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

const prices = require("../store.json");
const LinkedUser = require("../schemas/LinkedUser.js");
const { Licences } = require("../index.js")

module.exports.run = async (bot, message, args) => {

	message.delete();

	if(args[0] == "link") {
		const key = args[1];
		if (!key) return message.channel.send("Neplatný link code.");
		try {
			const shifted = key
			.split('')
			.map(char => String.fromCharCode(char.charCodeAt(0) - 1))
			.join('');
			const system_id = atob(shifted);
			LinkedUser.findOne({
				id: message.author.id
			}).then((data) => {
				if(data) {
					data.system_id = system_id
				} else {
					data = new LinkedUser({
						id: message.author.id,
						system_id: system_id
					})
				}
				data.save();
				message.channel.send(`Účet byl úsěšně propojen. (${message.author.username})`).then(m => setTimeout(() => m.delete(), 5000));
			}).catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
			message.channel.send("Neplatný link code.");
		}
		return;
	}

	let system_id = null;
	let username = null;
	if(args[0]) {
		if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("Musíš být ADMINISTRATOR.").then(m => setTimeout(() => m.delete(), 5000));
		const data_lu = await LinkedUser.findOne({ id: args[0] })
		if(!data_lu) return message.channel.send("Uživatel s tímhle ID nemá propojený účet.").then(m => setTimeout(() => m.delete(), 5000));
		system_id = data_lu.system_id;
		username = (await bot.users.fetch(args[0])).username;
		console.log(username);
	} else {
		let Embed = new EmbedBuilder()
		.setAuthor({ name: "FildaGames store", iconURL: message.guild.iconURL() })
		.setColor("#41ff4b")
		.setDescription(`${message.author.username} zkontroluj svoje dms!`)
		message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 5000));

		const data_lu = await LinkedUser.findOne({ id: message.author.id })
		if(data_lu) {
			system_id = data_lu.system_id;
			username = message.author.username;
		} else {
			username = "not linked"
		}
	}

	const storeSchema = new mongoose.Schema({
		key: String,
		system_id: String
	});

	let DMEmbed = new EmbedBuilder()
	.setColor("#41ff4b")
	.setAuthor({ name: `FildaGames store - ${username}`, iconURL: message.guild.iconURL()})
	.setThumbnail(bot.user.displayAvatarURL())
	.setTimestamp()
	.setDescription("Dostupné FGU hry k zakoupení.")
	.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
	for (const game in prices.games) {
		let shop_string = ""
		if (!system_id) {
			shop_string = "- hra nevlastněna"
		} else {
			const Store = Licences.model("Store", storeSchema, game);
			const data_s = await Store.findOne({ system_id: system_id })
			
			if(data_s) {
				shop_string = `- hra zakoupena \n- licenční klíč: ||${data_s.key}||`;
			} else {
				shop_string = "- hra nevlastněna"
			}
		}
		DMEmbed.addFields({ name: `${prices.games[game].name} - ${prices.games[game].price}€`, value: shop_string });
	}
	return message.author.send({ embeds: [DMEmbed] });
}

module.exports.config = {
	name: "store",
	aliases: []
}