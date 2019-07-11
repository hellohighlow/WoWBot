const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
	addPlayer:function(msg, id){
		mongo.connect(url, (err, client) => {
			if (err) {
				console.error(err);
				return;
		  	}
		  	const db = client.db('Players')
		  	const collection = db.collection('Mains')
		  	var data = msg.split(' ');
		  	try{
		  		collection.insertOne({'_id': id, 'name': data[1], 'lvl': data[2], 'class': data[3], 'pro1': data[4], 'pro2': data[5]});
	  		}catch(e){
		  		console.log(e);
	  		}
		  	client.close();
		})
	},

	lvlUp:function(msg)
}
