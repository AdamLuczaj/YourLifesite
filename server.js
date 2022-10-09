const pug = require("pug");
const express = require("express");
let app = express();
const path = require('path');

app.use(express.static("public"));
app.use(express.json());

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;


//View engine
app.set("view engine", "pug");

app.get("/", getHomePage);
app.get("/mypws", getPasswordsPage);
app.get("/mypws/:pwID", getPasswordByID)
app.get("/pwgenerator", getPasswordGenerator);
app.post("/pwgenerator", addPassword);
app.get("/weather", getWeatherPage);

function getHomePage(request, response) {

    response.sendFile(path.join(__dirname+'/public/homepage.html'));

}

function getPasswordsPage(request, response) {

    let websitesToSend = [];

    //Look through all websites in the database and send them to the pug page.
    db.collection("websites").find()
    .toArray((err, results) => {
        results.forEach(website => {
            websitesToSend.push(website)
        })

        response.send(
            pug.renderFile("./views/pages/passwordspage.pug", {websitesToSend: websitesToSend})
        );

    });

}

function getPasswordByID(request, response) {

    let oid;
    try {
        oid = new mongo.ObjectId(request.params.pwID);
    } catch {
        response.status(404).send("Unknown ID");
        return;
    }

    //Get the website based on it's id in the mongo database.
    db.collection("websites").findOne({"_id":oid}, function(err, websiteFound){
		if(err){
			response.status(500).send("Error reading database.");
			return;
		}
		if(!websiteFound){
			response.status(404).send("Unknown ID");
			return;
		}

        response.status(200);
		    response.send(
                pug.renderFile("./views/pages/passwordpage.pug", {websiteFound: websiteFound})
            );

	});
}

function getPasswordGenerator(request, response) {

    response.sendFile(path.join(__dirname+'/public/pwgenerator.html'));

}

function addPassword(request, response) {

    //Don't add passwords that already exist.
    let websiteExists = false;

    db.collection("websites").find()
    .toArray((err, results) => {
        
        results.forEach(website => {
            if (website.websiteName === request.body.websiteName) {
                websiteExists = true;
            }
        });

        if (websiteExists) {
            response.statusCode = 401;
            response.send();
            response.end();
        }

        else {

            let idToSend;

            db.collection("websites").insertOne({websiteName: request.body.websiteName, websitePassword: request.body.websitePassword}, function(err, result) {
                if(err) throw err;

                idToSend = result.insertedId.toString();
              
                response.statusCode = 200;
                response.send();
                response.end();
    
            });
    
        }

    });

}

function getWeatherPage(request, response) {

    response.sendFile(path.join(__dirname+'/public/weatherapp.html'));

}

//Write more stuff here.

MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
    if(err) throw err;

    db = client.db('tlsd');
    app.listen(3000);

    console.log("Server listening at http://localhost:3000");

});