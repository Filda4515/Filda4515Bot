const Discord = require("discord.js");
const fs = require("fs");
const elita = require("../elita.json");

module.exports.run = async (bot, message, args) => {
    
    let JSONelita = JSON.parse(fs.readFileSync("./elita.json", "utf8"));
    
    if(args[0] == "info")
    {
        let DMEmbed = new Discord.RichEmbed()
        .setColor("#FFAE00")
        .setAuthor("Filda4515 Bot - Elita info", message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("Elita role využívá procentuální progress\n- Pro získání role musíte dosáhnout 100%\n- Po dosáhnutí Elita role jí zachováte dokud nedropnete pod 10%\n\nPožadavky pro Elita roli jsou tajné, ale ve zkratce stačí nebýt kokot a být aktivní na dc :)\nPro získání Elita role je potřeba **DJ role**, ta se dá získat aktivitou ve vc.\n\n**POZOR: IRL MÁ MINIMÁLNÍ VLIV NA ELITA ROLI!!!**")	
        .setFooter("Filda4515 Bot", bot.user.displayAvatarURL);
        message.author.send(DMEmbed);
    }
    else if(message.author.id == "356168492942229506" && args[0] == "set")
    {
        JSONelita[args[1]] = args[2];
        
        fs.writeFile("./elita.json", JSON.stringify(JSONelita), (err) =>{
            if (err) console.log(err)
        });
        message.channel.send(`${[args[1]]}: ${JSONelita[args[1]]}`);
    }
    else if(message.author.id == "356168492942229506" && args[0] == "get")
    {
        if(!args[1])
        {
            var string = "";
            for (var key in JSONelita){
                string += `${key} - ${JSONelita[key]}, `;
            }
            message.channel.send(string.slice(0, -2));
        }
        else
        {
            message.channel.send(`${[args[1]]}: ${JSONelita[args[1]]}`); 
        }
    }
    else if(message.author.id == "356168492942229506" && args[0] == "remove")
    {
        delete JSONelita[args[1]];
        
        fs.writeFile("./elita.json", JSON.stringify(JSONelita), (err) =>{
            if (err) console.log(err)
        });
        message.channel.send(`${[args[1]]}: ${JSONelita[args[1]]}`);
    }
    else
    {
        if(JSONelita[message.author.username]){
            value = JSONelita[message.author.username];
        }
        else{
            value = "Chybí role DJ.";
        }
        message.channel.send(`Elita progress: ${value}\nPro více informací .elita info`);
    }
}

module.exports.config = {
	name: "elita",
	aliases: ["elite","Elita","Elite"]
}