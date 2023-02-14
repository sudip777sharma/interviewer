const mongoose = require('mongoose');
require('dotenv').config()

var username = process.env.MONGODB_INTERVIEWX_USERNAME;
var password = process.env.MONGODB_INTERVIEWX_PASSWORD;
var dataBaseName = process.env.MONGODB_INTERVIEWX_DATABASENAME;

console.log("username:", username);
console.log("password:", password);
console.log("dataBaseName:", dataBaseName);

const url = `mongodb+srv://${username}:${password}@cluster0.tuz4grr.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("---conn.js------------------------------------");
    console.log(`DB connection succesful`);
    console.log("------------------------------------conn.js---");
})