const dotenv = require('dotenv');
const express = require('express');
const app = express();

// Get data from config.env
dotenv.config({
    path: './config.env'
});

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => {
console.log(`Server started on port: ${port}`)
});