const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);

const bot = new Discord.Client({ intents });

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("gachiBASS", {type: "LISTENING"});
    
    
    //const clientId = "649630182042370069";

    //const guildId = "510138523421114368";
    //const guild = bot.guilds.cache.get(guildId);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const fs = require("fs");

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);
		
	let jsfile = files.filter(f => f.endsWith(".js"));
	if(jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't find Commands!");
	}
	
	for (const file of jsfile) {
		let command = require(`./commands/${file}`);
		bot.commands.set(command.config.name, command);
		command.config.aliases.forEach(alias => {
			bot.aliases.set(alias, command.config.name)
		});
	};
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
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    let oldVoiceId = oldState.channelId;
    let oldVoice = oldState.channel;    
    let newVoiceId = newState.channelId;
    let newVoice = newState.channel;
    let user = await bot.users.fetch(oldState.id);

    if (oldVoiceId != newVoiceId) {
        if (oldVoiceId == null) {
          console.log(user.username + " joined to " + newVoice.name);
          if (newVoice.name == "forever_alone") console.log(user.username + " je v píči :(");
        } else if (newVoiceId == null) {
          console.log(user.username + " left from " + oldVoice.name);
          if (oldVoice.name == "forever_alone") console.log(user.username + " už není v píči :)");
        } else {
          console.log(user.username + " switched channels from " + oldVoice.name + " to " + newVoice.name);
          if (newVoice.name == "forever_alone") console.log(user.username + " je v píči :(");
          if (oldVoice.name == "forever_alone") console.log(user.username + " už není v píči :)");
        }
    } 
});

bot.login("NjQ5NjMwMTgyMDQyMzcwMDY5.XelT8g.CBEJNRw3cjl5p_4CUYKyDwHNHbo");