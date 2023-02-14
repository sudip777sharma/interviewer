const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser());

require('./db/conn');
// const user = require('./model/userSchema')

app.use(express.json());

// we link the router files to make our route
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')));
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log("---app.js------------------------------------");
    console.log(`server is running at port ${PORT}`)
    console.log("------------------------------------app.js---");
})