
// App create
const express = require('express');
const app = express();

// port find out
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware use
app.use(express.json());
const fileupload = require("express-fileupload");

// iss middlware ka use karke hm apni file ko server par use karenge
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// db se connect
const db = require('./config/database');
db.connect();

// cloud se connect
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// api route mount
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);




// activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})