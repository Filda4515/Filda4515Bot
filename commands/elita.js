const Discord = require("discord.js");
const elita = require("../elita.json");

module.exports.run = async (bot, message, args) => {
    
    if(args[0] == "info") {
        let DMEmbed = new Discord.RichEmbed()
        .setColor("#FFAE00")
        .setAuthor("Filda4515 Bot - Elita info", message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("Elita role využívá procentuální progress\n- Pro získání role musíte dosáhnout 100%\n- Po dosáhnutí Elita role jí zachováte dokud nedropnete pod 10%\n\nPožadavky pro Elita roli jsou tajné, ale ve zkratce stačí nebýt kokot a být aktivní na dc :)\nPro získání Elita role je potřeba **DJ role**, ta se dá získat aktivitou ve vc.\n\n**POZOR: IRL MÁ MINIMÁLNÍ VLIV NA ELITA ROLI!!!**")	
        .setFooter("Filda4515 Bot", bot.user.displayAvatarURL);
        message.author.send(DMEmbed);
    }
    else
    {
        if(message.author.id == "356168492942229506") value = elita.Filda4515;
        else if(message.author.id == "262178276452204545") value = elita.Hspsr;
        else if(message.author.id == "271572340066877440") value = elita.Raqtty;
        else if(message.author.id == "362605241377488905") value = elita.Tuty;
        else value = "Chybí role DJ.";
        message.channel.send(`Elita progress: ${value}\nPro více informací .elita info`);
    }
    
    message.delete();
}

module.exports.config = {
	name: "elita",
	aliases: ["elite","Elita","Elite"]
}