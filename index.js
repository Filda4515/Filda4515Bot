const botconfig = require("./botconfig.json");
const ENV = require("./ENV.json");
const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require('discord.js');

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

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

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect(ENV.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("Connected to the database!")
}).catch((err)=>{
	console.log(err)
})

bot.on("messageCreate", async message => {
	if(message.author.bot || message.channel.type === "dm") return;
	
	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	if(!message.content.startsWith(prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
	if(commandfile) commandfile.run(bot,message,args);
});

const Guild = require("./schemas/Guild.js");
const User = require("./schemas/User.js");
bot.on("messageCreate", async message => {
	if(message.author.bot || message.channel.type === "dm") return;
	
	const g_data = await Guild.findOne({ id: message.guild.id });
	
	if(!g_data ) return;
	
	if(message.channel.id != g_data.Channel) return;
	
	const number = parseInt(message.content);
	
	if(isNaN(number)) return;
	
	if(message.author.id == g_data.LastUser) {
		message.reply("Stejný uživatel nemůže napsat dvě čísla po sobě.\nZačínáme znovu od 1.");
		g_data.Current = 0;
		g_data.LastUser = "";
		g_data.LastMessage = message.id;
		g_data.save();
		User.findOne({
			id: message.author.id,
			Guild: message.guild.id
		}).then((data) => {
			if(data) {
				data.Counts--;
			} else {
				data = new User({
					id: message.author.id,
					Guild: message.guild.id,
					Counts: -1
				})
			}
			data.save();
		}).catch((err) => console.log(err));
		return;
	}
	
	if(number == g_data.Current + 1) {
		User.findOne({
			id: message.author.id,
			Guild: message.guild.id
		}).then((data) => {
			if(data) {
				data.Counts++;
			} else {
				data = new User({
					id: message.author.id,
					Guild: message.guild.id,
					Counts: 1
				})
			}
			data.save();
		}).catch((err) => console.log(err));
		g_data.Current = number;
		g_data.LastUser = message.author.id;
		g_data.LastMessage = message.id;
		g_data.Highest = Math.max(g_data.Highest, number);
		g_data.save();
		message.react('✅');
		// if(!message.member.roles.cache.some(role => role.id === '1056194781241421885')) {
			// message.member.roles.add('1056194781241421885');
		// }
		return;
	} else if(g_data.Current != 0) {
		message.reply("Špatné číslo.\nZačínáme znovu od 1.");
		g_data.Current = 0;
		g_data.LastUser = "";
		g_data.LastMessage = message.id;
		g_data.save();
		User.findOne({
			id: message.author.id,
			Guild: message.guild.id
		}).then((data) => {
			if(err) throw err;
			if(data) {
				data.Counts--;
			} else {
				data = new User({
					id: message.author.id,
					Guild: message.guild.id,
					Counts: -1
				})
			}
			data.save();
		}).catch((err) => console.log(err));
		return;
	}
})

bot.on("messageDelete", async message => {
	const g_data = await Guild.findOne({ id: message.guild.id });
	if(message.id != g_data.LastMessage) return;
	message.channel.send(`Číslo ${g_data.Current} bylo smazáno. Následuje číslo: ${g_data.Current + 1}`);
})

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

bot.login(ENV.token);