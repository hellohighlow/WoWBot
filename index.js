const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const db = require('./databaseHandler.js');

var cmd = [
	(new RegExp("!Setup", "i")),
	(new RegExp("!Character", "i")),
	(new RegExp("!LVL", "i"))
];


client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg =>{
	//Bot can't respond to itself
	if(msg.author.bot){return}

	//!Setup Name Lvl Class Pro1 Pro2
	if(cmd[0].test(msg.content)){
		console.log("Setup");
		db.addPlayer(msg.content, msg.author.id);
	}

	//!Character
	if(cmd[1].test(msg.content)){
		console.log("Character");
	}

	//!lvl #
	if(cmd[2].test(msg.content)){
		console.log("Level");
		db.lvlUp(msg.content, msg.author.id);
	}


})

client.login(auth.token)
