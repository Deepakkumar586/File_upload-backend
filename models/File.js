const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

// Post middleware
fileSchema.post("save", async function (doc) {
    try {
        // check inside doc ---we say ki doc ke ander kya pada huaa hai
        console.log("DOC", doc)


        // treanspoter create
        let transporter = createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,

            }
        })

        // send mail
        let info = await transporter.sendMail({
            from: 'CodeHelp by Babbar',
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2>  <p>File upload view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })
        console.log("INFO", info)



    }
    catch (err) {
        console.error(err);


    }
})


const File = mongoose.model('File', fileSchema);
module.exports = File;