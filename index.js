const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);

const bot = new Discord.Client({ intents });

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("gachiBASS", {type: "LISTENING"});
})

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const fs = require("fs");

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);
		
	let jsfile = files.filter(f => f.endsWith(".js"));
	if(jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't find Commands!");
	}
	
	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		bot.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {
			bot.aliases.set(alias, pull.config.name)
		});
	});
});

bot.on("messageCreate", async message => {
	if(message.author.bot || message.channel.type === "dm") return;
	
	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	if(!message.content.startsWith(prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
	if(commandfile) commandfile.run(bot,message,args)
})

bot.on("voiceStateUpdate", (oldMember, newMember)=> { 
  let oldVoice = oldMember.voiceChannelID; 
  let newVoice = newMember.voiceChannelID; 
  if (oldVoice != newVoice) {
    if (oldVoice == null) {
      console.log("User joined!" + oldMember + " " + newMember);
    } else if (newVoice == null) {
      console.log("User left!" + oldMember+ " " + newMember);
    } else {
      console.log("User switched channels!" + oldMember + " " + newMember);
    }
  }
});

bot.login(process.env.secrettoken);