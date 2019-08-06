const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('./databaseHandler.js');
require('dotenv').config({path: __dirname + '/.env'});
const auth = process.env.AUTH;

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
		setup(msg, msg.author.tag);
	}

	//!Character
	if(cmd[1].test(msg.content)){
		console.log("Character");
	}

	//!lvl #
	if(cmd[2].test(msg.content)){
		Level(msg, msg.author.tag);
	}



})

async function setup(msg, userID){
	if(await db.addPlayer(msg.content, userID)){
		msg.reply("Character set!");
	}else{
		msg.reply("Character exists");
	}
}

async function Level(msg, userID){
	if(await db.lvlUp(msg.content, userID)){
		msg.reply("Level Up!");
	}else{
		msg.reply("Level up failed");
	}
}












client.login(auth)
