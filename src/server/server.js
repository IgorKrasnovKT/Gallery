var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/albums", require("./routers/albums"));
app.use("/photos", require("./routers/photos"));

app.listen(3001, () => console.log("Node js server started on port 3001!"));