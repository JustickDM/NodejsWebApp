'use strict';

var port = process.env.PORT || 1337;
var serverLogsPath = "server.log";
var dbLogsPath = "db.log";
var dbUri = "mongodb://localhost:27017/";

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const logger = require("./Modules/logger");
const app = express();
const mongoClient = new MongoClient(dbUri, { useNewUrlParser: true });

app.use(function (request, response, next){  
    var data = `${request.method} ${request.url} ${request.get("user-agent")}`;

    logger.writeLog(data, serverLogsPath);

    next();
});

app.get("/", function (request, response){
    response.end("Hello from Express!");
});

app.get("/Users", function (request, response){
    mongoClient.connect(function (error, client) {

        if (error) {
            logger.writeLog(error, dbLogsPath);

            response.sendStatus(418);
        }
        else {
            const db = client.db("local");
            const collection = db.collection("users");

            collection.find().toArray(function (error, results) {

                if (error) {
                    logger.writeLog(error, dbLogsPath);
                }

                response.send(results);
                response.sendStatus(200);

                client.close();
            });
		}
    });
});

app.listen(port);
