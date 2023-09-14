const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

const prices = require("../store.json");
const LinkedUser = require("../schemas/LinkedUser.js");
const { Licences } = require("../index.js")

module.exports.run = async (bot, message, args) => {

	message.delete();

	if (args[0] == "link") {
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

	let Embed = new EmbedBuilder()
	.setAuthor({ name: "FildaGames store", iconURL: message.guild.iconURL() })
	.setColor("#41ff4b")
	.setDescription(`${message.author.username} zkontroluj svoje dms!`)
	message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 5000));

	let system_id = null;
	const data_lu = await LinkedUser.findOne({ id: message.author.id })
	if(data_lu) system_id = data_lu.system_id;

	if (!system_id) {
		let DMEmbed = new EmbedBuilder()
		.setColor("#41ff4b")
		.setAuthor({ name: `FildaGames store - not linked`, iconURL: message.guild.iconURL()})
		.setThumbnail(bot.user.displayAvatarURL())
		.setTimestamp()
		.setDescription("Dostupné FGU hry k zakoupení.\n(Pro linknutí použij FildaGames Launcher.)")
		.addFields(
			{ name: `Filda4515 Adventure - ${prices["Filda4515 Adventure"]}€`, value: "- hra nevlastněna"},
			{ name: `Filda4515 Adventure - ${prices["Agent Filda4515"]}€`, value: "- hra nevlastněna"}
		)
		.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
		return message.author.send({ embeds: [DMEmbed] });
	}

	const storeSchema = new mongoose.Schema({
		key: String,
		system_id: String
	});

	let store1 = null;
	const Store1 = Licences.model("Store", storeSchema, "Filda4515Adventure");
	const data_s1 = await Store1.findOne({ system_id: system_id })
	if(data_s1) store1 = data_s1.key;

	let store2 = null;
	const Store2 = Licences.model("Store", storeSchema, "AgentFilda4515");
	const data_s2 = await Store2.findOne({ system_id: system_id })
	if(data_s2) store2 = data_s2.key;

	const string_s1 = store1 ? `- hra zakoupena \n- licenční klíč: ||${store1}||` : `- hra nevlastěna`;
	const string_s2 = store2 ? `- hra zakoupena \n- licenční klíč: ||${store2}||` : `- hra nevlastěna`;
	
	let DMEmbed = new EmbedBuilder()
	.setColor("#41ff4b")
	.setAuthor({ name: `FildaGames store - ${message.author.username}`, iconURL: message.guild.iconURL()})
	.setThumbnail(bot.user.displayAvatarURL())
	.setTimestamp()
	.setDescription("Dostupné FGU hry k zakoupení.")
	.addFields(
		{ name: `Filda4515 Adventure - ${prices["Filda4515 Adventure"]}€`, value: string_s1},
		{ name: `Filda4515 Adventure - ${prices["Agent Filda4515"]}€`, value: string_s2}
	)
	.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
	return message.author.send({ embeds: [DMEmbed] });
}

module.exports.config = {
	name: "store",
	aliases: []
}