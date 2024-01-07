const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const mongoose = require("mongoose");

const prices = require("../store.json");
const LinkedUser = require("../schemas/LinkedUser.js");
const { Licences } = require("../index.js");

module.exports.run = async (bot, message, args) => {
	if(args[0] == "close") {
		if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("Musíš být Administrator.").then(m => setTimeout(() => m.delete(), 5000));
		const name = message.channel.name;
		const parts = name.split("-");
		if (parts.length > 1) {
			if (parts[0] != "store") return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
			const user_id = parts[1];
			if (isNaN(user_id)) return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
			try {
				const user = await bot.users.fetch(user_id);
				let DMEmbed = new EmbedBuilder()
				.setColor("#41ff4b")
				.setAuthor({ name: `FildaGames store - ${user.username}`, iconURL: message.guild.iconURL()})
				.setThumbnail(bot.user.displayAvatarURL())
				.setTimestamp()
				.setDescription("Děkujeme za váš nákup!")
				.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
				message.channel.delete();
				return user.send({ embeds: [DMEmbed] });
			} catch (error) {
				return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
			}
		} else {
			return message.channel.send("Neplatný kanál.").then(m => setTimeout(() => m.delete(), 5000));
		}
	}

	const storeSchema = new mongoose.Schema({
		key: String,
		system_id: String
	});
	let system_id = null;
	let wallet = null;
	let username = null;
	message.delete();
	if(args[0] == "link") {
		const key = args[1];
		if (!key) return message.channel.send("Neplatný link code.").then(m => setTimeout(() => m.delete(), 5000));;
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
						system_id: system_id,
						wallet: "0"
					})
				}
				data.save();
				message.channel.send(`Účet byl úsěšně propojen. (${message.author.username})`).then(m => setTimeout(() => m.delete(), 5000));
			}).catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
			message.channel.send("Neplatný link code.").then(m => setTimeout(() => m.delete(), 5000));
		}
		return;
	}

	if(args[0] == "buy") {
		const data_lu = await LinkedUser.findOne({ id: message.author.id })
		if(data_lu) {
			system_id = data_lu.system_id;
			username = message.author.username;
		} else {
			return message.channel.send("Pro nákup je potřeba mít propojený účet (Použij FildaGames Launcher k dispozici v <#1085521471729840138>)").then(m => setTimeout(() => m.delete(), 5000));;
		}

		const product = args[1];
		
		let product_list = [];
		for (const game in prices.games) {
			product_list.push(game);
		}
		for (const bundle in prices.bundles) {
			product_list.push(bundle);
		}

		if (!product_list.includes(product)) {
			return message.channel.send(`Neplatný název produktu.\nDostupné produkty: ${product_list}`).then(m => setTimeout(() => m.delete(), 5000));
		}

		let price = 0;
		for (const game in prices.games) {
			if (product == game) {
				price = (prices.games[game].price*(1-prices.games[game].discount/100)).toFixed(2)
				break;
			}
		}
		for (const bundle in prices.bundles) {
			if (product == bundle) {
				for (const game of prices.bundles[bundle].games) {
					const Store = Licences.model("Store", storeSchema, game);
					const data_s = await Store.findOne({ system_id: system_id })
	
					if(!data_s) price += parseFloat((prices.games[game].price*(1-prices.games[game].discount/100)).toFixed(2));
				}
				price = price.toFixed(2);
				price = (price*(1-prices.bundles[bundle].discount/100)).toFixed(2);
				if (price == 0) return message.channel.send(`Již vlastníte všechny položky z balíčku: ${prices.bundles[bundle].name}`).then(m => setTimeout(() => m.delete(), 5000));
				break;
			}
		}

		message.guild.channels.create({
			name: `store - ${message.author.id}`,
			type: ChannelType.GuildText,
			parent: "1085521333452017674",
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone,
					deny: [PermissionsBitField.Flags.ViewChannel],
				},
				{
					id: message.author.id,
					allow: [PermissionsBitField.Flags.ViewChannel],
				},
			],
		}).then(channel => channel.send(`<@356168492942229506>\nProduct: ${product}\nBuyer: <@${message.author.id}>\nPrice: ${price}€`))
		.catch(console.error);
		return;
	}

	if(args[0] == "wallet") {
		if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("Musíš být ADMINISTRATOR.").then(m => setTimeout(() => m.delete(), 5000));

		if (!args[1]) return message.channel.send("set <userid> <money>\nget <userid>").then(m => setTimeout(() => m.delete(), 5000));

		if (args[1] == "set" && args[3]) {
			const data_lu = await LinkedUser.findOne({ id: args[2] });
			if(!data_lu) return message.channel.send("Uživatel s tímhle ID nemá propojený účet.").then(m => setTimeout(() => m.delete(), 5000));
			data_lu.wallet = args[3];
			data_lu.save();
			username = (await bot.users.fetch(args[2])).username;
			return message.channel.send(`"${username}" má ve své peněžence ${args[3]}€.`).then(m => setTimeout(() => m.delete(), 5000));
		}
		if (args[1] == "get" && args[2]) {
			const data_lu = await LinkedUser.findOne({ id: args[2] });
			if(!data_lu) return message.channel.send("Uživatel s tímhle ID nemá propojený účet.").then(m => setTimeout(() => m.delete(), 5000));
			username = (await bot.users.fetch(args[2])).username;
			return message.channel.send(`"${username}" má ve své peněžence ${data_lu.wallet}€.`);
		}
		return message.channel.send("set <userid> <money>\nget <userid>").then(m => setTimeout(() => m.delete(), 5000));
	}

	if(args[0]) {
		if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("Musíš být ADMINISTRATOR.").then(m => setTimeout(() => m.delete(), 5000));
		const data_lu = await LinkedUser.findOne({ id: args[0] });
		if(!data_lu) return message.channel.send("Uživatel s tímhle ID nemá propojený účet.").then(m => setTimeout(() => m.delete(), 5000));
		system_id = data_lu.system_id;
		wallet = data_lu.wallet;
		username = (await bot.users.fetch(args[0])).username;
	} else {
		let Embed = new EmbedBuilder()
		.setAuthor({ name: "FildaGames store", iconURL: message.guild.iconURL() })
		.setColor("#41ff4b")
		.setDescription(`${message.author.username} zkontroluj svoje dms!`)
		message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 5000));

		const data_lu = await LinkedUser.findOne({ id: message.author.id });
		if(data_lu) {
			system_id = data_lu.system_id;
			wallet = data_lu.wallet;
			username = message.author.username;
		} else {
			username = "not linked";
		}
	}

	let DMEmbed = new EmbedBuilder()
	.setColor("#41ff4b")
	.setAuthor({ name: `FildaGames store - ${username}`, iconURL: message.guild.iconURL()})
	.setThumbnail(bot.user.displayAvatarURL())
	.setTimestamp()
	.setDescription("Dostupné FGU hry k zakoupení.\nPro zakoupení .store buy <product_name> (product_name = jméno bez mezer)")
	.setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
	if (username != "not linked") {
		DMEmbed.addFields({ name: `FildaGames Wallet`, value: `Ballance: ${wallet}€` });
	}
	for (const game in prices.games) {
		let shop_string = null;
		if (!system_id) {
			shop_string = "- hra nevlastněna";
		} else {
			const Store = Licences.model("Store", storeSchema, game);
			const data_s = await Store.findOne({ system_id: system_id });
			
			if(data_s) {
				shop_string = `- hra zakoupena\n- licenční klíč: ||${data_s.key}||`;
			} else {
				shop_string = "- hra nevlastněna";
			}
		}
		let price_string = null
		if (prices.games[game].discount == 0) {
			price_string = `${prices.games[game].price}€`
		} else {
			const discount_price = (prices.games[game].price*(1-prices.games[game].discount/100)).toFixed(2)
			price_string = `~~${prices.games[game].price}€~~ **${discount_price}€ (${prices.games[game].discount}% OFF)**`
		}
		
		DMEmbed.addFields({ name: `${prices.games[game].name} - ${price_string}`, value: shop_string });
	}
	for (const bundle in prices.bundles) {
		let bundle_string = `__Hry obsažené v balíčku:__`;
		let total_price = 0;
		for (const game of prices.bundles[bundle].games) {
			if (!system_id) {
				shop_string = "- hra nevlastněna"
			} else {
				const Store = Licences.model("Store", storeSchema, game);
				const data_s = await Store.findOne({ system_id: system_id });
				const discount_price = (prices.games[game].price*(1-prices.games[game].discount/100)).toFixed(2);
				if(data_s) {
					bundle_string += `\n- ~~${prices.games[game].name} - ${discount_price}€~~`;
				} else {
					bundle_string += `\n- ${prices.games[game].name} - ${discount_price}€`;
					total_price += parseFloat(discount_price);
				}
			}
		}
		total_price = total_price.toFixed(2);
		if (total_price != 0) {
			bundle_string += `\nIndividuální cena položek: ${total_price}€`;
			bundle_string += `\nSleva na balíček: ${prices.bundles[bundle].discount}%`;
			bundle_string += `\nVaše cena: ${(total_price*(1-prices.bundles[bundle].discount/100)).toFixed(2)}€`;
		}
		DMEmbed.addFields({ name: `${prices.bundles[bundle].name}`, value: bundle_string });
	}
	return message.author.send({ embeds: [DMEmbed] });
}

module.exports.config = {
	name: "store",
	aliases: []
}