let websiteNames = ["Lifesite", "Test"];
let websites = [];

websiteNames.forEach(name => {
    let w = {};
    w.websiteName = name;
    w.websitePassword = name;
    websites.push(w);
});


let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
  if(err) throw err;	

  db = client.db('tlsd');
  
  db.listCollections().toArray(function(err, result){
	 if(result.length == 0){
		 db.collection("websites").insertMany(websites, function(err, result){
			if(err){
				throw err;
			}
			
			console.log(result.insertedCount + " websites added successfuly (should be 2).");
			client.close();
		});
		return;
	 }
	 
	 let numDropped = 0;
	 let toDrop = result.length;
	 result.forEach(collection => {
		db.collection(collection.name).drop(function(err, delOK){
			if(err){
				throw err;
			}
			
			console.log("Dropped collection: " + collection.name);
			numDropped++;
			
			if(numDropped == toDrop){
				db.collection("websites").insertMany(websites, function(err, result){
					if(err){
						throw err;
					}
					
					console.log(result.insertedCount + " websites added successfuly (should be 2).");
					client.close();
				});
			}
		});		
	 });
  });
});