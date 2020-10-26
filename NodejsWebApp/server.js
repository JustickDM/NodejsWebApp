'use strict';

const express = require("express");
const app = express();

var port = process.env.PORT || 1337;

app.get("/", function (request, response) {

    response.end("Hello from Express!");
});

app.listen(port);
