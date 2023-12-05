const { EmbedBuilder } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const channel_id = "1150842795402211439";
    if (message.channel.id != channel_id) {
        message.delete();
        return message.channel.send(`.advent lze použít pouze v <#${channel_id}>.`).then(m => setTimeout(() => m.delete(), 5000));
    }

    const Advent = require("../schemas/Advent.js");
    let data = await Advent.findOne({ id: message.author.id });
    if(!data) {
        data = new Advent({
            id: message.author.id,
            _1: 0,
            _2: 0,
            _3: 0,
            _4: 0,
            _5: 0,
            _6: 0,
            _7: 0,
            _8: 0,
            _9: 0,
            _10: 0,
            _11: 0,
            _12: 0,
            _13: 0,
            _14: 0,
            _15: 0,
            _16: 0,
            _17: 0,
            _18: 0,
            _19: 0,
            _20: 0,
            _21: 0,
            _22: 0,
            _23: 0,
            _24: 0
        })
        data.save();
    }

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    if (!args[0]){
        let Embed = new EmbedBuilder()
        .setColor("#ebb734")
        .setAuthor({ name: "Adventní kalendář 2023", iconURL: message.guild.iconURL()})
        .setTimestamp()
        .setDescription("Pro task pro otevření okýnka: .advent <číslo okýnka>.\nPo otevření všech oken .advent claim")
        .setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
        for (let i = 1; i <= 24; i++) {
            const fieldValue = data[`_${i}`];
            let state = "```ansi";
            if (i > currentDay) state += "\n[2;31mLOCKED\n```";
            else if (fieldValue != -1) state += "\n[2;37mCLOSED\n```";
            else state += "\n[2;32mOPENED\n```";

            let number = "";
            if (i < 10) number = "0";
            number += i;
            Embed.addFields({ name:`_ _    [ ${number} ]  `, value: state, inline: true});
        }
        return message.channel.send({ embeds: [Embed] });
    }

    if (args[0] == "claim"){
        for (let i = 1; i <= 24; i++) {
            if (data[`_${i}`] != "-1") return message.channel.send("Nemáš otevřené všechny okýnka!");
        }
        if(!message.member.roles.cache.has("1178324393370337341")) {
            message.member.roles.add("1178324393370337341");
            return message.channel.send("Úspěšně jsi získal limitovanou roli!");
        }
        return message.channel.send("Už máš limitovanou roli!");
    }

    const okynko = parseInt(args[0]);
    if (isNaN(okynko) || okynko < 1 || okynko > 24) return message.channel.send("Neplatné číslo okýnka.");
    if (okynko > currentDay) return message.channel.send("Okýnko je zamknuté. Vrať se později.");
    const value = data[`_${okynko}`];
    if (value == "-1") return message.channel.send("Okýnko je již otevřené.");

    const tasks = require("../advent.json");
    let description;
    let remove = false;
    let Embed = new EmbedBuilder()
    .setColor("#ebb734")
    .setAuthor({ name: "Adventní kalendář 2023", iconURL: message.guild.iconURL()})
    .setTimestamp()
    .setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })
    if (args[1]) {
        message.delete();
        remove = true;
        if (!/^(\|\|).*(\|\|)$/.test(args[1])) {
            description = "Musíš použít spoilery!";
        } else {
            const answer = args[1].replace(/^\|\||\|\|$/g, "");
            if (tasks[okynko].answer == answer && data[`_${okynko}`] != "-1") {
                data[`_${okynko}`] = -1;
                data.save();
                description = "Správná odpověď. Otevřel jsem ti okýnko.";
            } else {
                description = "Špatná odpověď. Zkus to znovu.";
            }
        }
    } else {
        description = tasks[okynko].desc;
        if (tasks[okynko].answer) {
            description += "\n\nPro zadání odpovědi použij .advent <číslo okýnka> ||\\|\\|<odpověď>\\|\\| ||(**POUZE ODPOVĚĎ MUSÍ BÝT VE SPOILERU, ZBYTEK NE**)";
        }
    }
    Embed.addFields({ name:`Sanctuary Guardian [ ${okynko<10? "0" : ""}${okynko} ]`, value: description});
    if (remove) return message.channel.send({ embeds: [Embed] }).then(m => setTimeout(() => m.delete(), 5000));
    return message.channel.send({ embeds: [Embed] });
}

module.exports.config = {
	name: "advent",
	aliases: []
}