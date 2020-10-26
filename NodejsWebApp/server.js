'use strict';

const express = require("express");
const app = express();
const fs = require("fs");

var port = process.env.PORT || 1337;

app.use(function (request, response, next)
{
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;

    console.log(data);

    fs.appendFile("server.log", data + "\n", function () { });

    next();
});

app.get("/", function (request, response)
{
    response.end("Hello from Express!");
});

app.get("/getUsers", function (request, response) {
    response.send(
        [
            { id: 1, name: "Max" },
            { id: 2, name: "Tom" }
        ]);
});

app.listen(port);
