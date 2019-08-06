const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config({path: __dirname + '/.env'});
const url = process.env.URL;

var collection;
mongo.connect(url, function(err, db){
	if(err) console.log(err);
	collection = db.db('Players').collection('Mains');
});

module.exports = {
	addPlayer: async function(msg, userID){
		if(await exists(userID)){
			console.log(userID);
			return false;
		}
		var data = msg.split(' ');
		collection.insertOne({'_id': ObjectID(userID), 'User': userID, 'Name': data[1], 'Level': data[2], 'Class': data[3], 'Pro1': data[4], 'Pro2': data[5]}	);
		return true;
	},

	lvlUp: async function(msg, userID){
		var data = msg.split(' ');
		if(await !exists(userID))
			return false;
		collection.updateOne({_id: ObjectID(userID)},
		{$set: {"Level": data[1]}},
		{upsert: false});
		return true;
	}
}

async function exists(userID){
	var player = await collection.findOne({_id: userID});
	if(player != null){
		return true;
	}
	return false;
}
