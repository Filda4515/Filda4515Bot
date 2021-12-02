const Discord = require("discord.js");
const fs = require("fs");
const mongo = require("../mongo.js");
const elitaschema = require("../schemas/elita-schema.js")

module.exports.run = async (bot, message, args) => {
    
    if(args[0] == "info")
    {
        let DMEmbed = new Discord.RichEmbed()
        .setColor("#FFAE00")
        .setAuthor("Filda4515 Bot - Elita info", message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("Elita role využívá procentuální progress\n- Pro získání role musíte dosáhnout 100%\n- Po dosáhnutí Elita role jí zachováte dokud nedropnete pod 10%\n\nPožadavky pro Elita roli jsou tajné, ale ve zkratce stačí nebýt kokot a být aktivní na dc :)\nPro získání Elita role je potřeba **DJ role**, ta se dá získat aktivitou ve vc.")	
        .setFooter("Filda4515 Bot", bot.user.displayAvatarURL);
        message.author.send(DMEmbed);
    }
    else if(message.author.id == "356168492942229506" && args[0] == "set")
    {
        let id = args[1];
        
        await mongo().then(async (mongoose) => {
            try {
                await elitaschema.findOneAndUpdate({
                _id: id
                },
                {
                    elitaprogress: args[2]
                },
                {
                    upsert: true,
                }).exec()
            } finally {
                mongoose.connection.close()
            }
        }).catch((err) => {
                console.log(err)
        })
        return message.channel.send("DONE");
    }
    else if(message.author.id == "356168492942229506" && args[0] == "get")
    {
        const id = args[1];
        
        await mongo().then(async (mongoose) => {
            try {
                elitadata = await elitaschema.findOne({
                _id: id
                }).exec()
                const user = await bot.users.cache.find(user => user.id === id)
                message.channel.send(`${user.username}: ${elitadata.elitaprogress}%`);
            } finally {
                mongoose.connection.close()
            }
        }).catch((err) => {
                console.log(err);
                message.channel.send("Chybí DJ role (více informací .elita info)");
        })
        return;
    }
    else
    {
        await mongo().then(async (mongoose) => {
            try {
                elitadata = await elitaschema.findOne({
                _id: message.author.id
                }).exec()
                message.channel.send(`${message.author.username}: ${elitadata.elitaprogress}%`);
            } finally {
                mongoose.connection.close()
            }
        }).catch((err) => {
                console.log(err);
                message.channel.send("Chybí DJ role (více informací .elita info)");
        })
        return;
    }
}

module.exports.config = {
	name: "elita",
	aliases: ["elite","Elita","Elite"]
}