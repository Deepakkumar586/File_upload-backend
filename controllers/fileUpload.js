const File = require('../models/File');
const cloudinary = require('cloudinary').v2

// localfileUpload handler
// ye handler ya function server ke ak location par file lo upload karega

exports.localFileUpload = async (req, res) => {
    try {

        // file fetch from request
        const file = req.files.file;
        console.log("File Aa gye", file);

        // server me file ko kis location par rakhna chahte hai ----->ya fir hm kah sakte hai ki ye  server ka path ahi
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('path--->', path);


        // add path to the move function 
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: "Local file upload successfully"
        });



    }
    catch (err) {
        console.log("no unable to file on the srver");
        console.log(err)
    }
}



// check file 
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);

}
// for upload images on cloudinary
async function uploadFileToCloudinary(file, folder, quality, height, width) {
    // if (quality) {
    //     options.quality = quality; 
    // }
    // if(height,width){
    //     options.height = height;
    //     options.width = width;
    // }
    const options = { folder }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
    // autometically detect kr lega ki file ka type kya hai
    options.resource_type = 'auto';
}

// Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        // data fetch 
        const { name, tag, email } = req.body;
        console.log(name, tag, email);


        // file ka name imageFile hai jo file send ki gyi hai uski key ko show karta hai

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Sorry File format not Supported'
            })
        }

        //  file format are supported
        const response = await uploadFileToCloudinary(file, 'CodeHelp');
        console.log(response);

        // db ke ander entry save
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image  successfully uploaded"
        })




    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: "SomeThing went wrong"
        })

    }
}


// Video Upload
exports.videoupload = async (req, res) => {
    try {
        // data fetch 
        const { name, tag, email } = req.body;
        console.log(name, tag, email);

        // video fetch
        const filevideo = req.files.videoFile;
        console.log(filevideo);

        // validation check
        const supportedTypes = ['mp4', 'mov'];
        const fileType = filevideo.name.split('.')[1].toLowerCase();
        console.log(fileType);


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Sorry Video File format not Supported'
            })
        }


        //  file  cloudinary format are supported
        const response = await uploadFileToCloudinary(filevideo, 'CodeHelp');
        console.log(response);


        // databse ke ander entry
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully uploaded"
        })




    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}



// imageSizereducer logic controller
exports.imageSizereducer = async (req, res) => {
    try {
        // data fetch 
        const { name, tag, email } = req.body;
        console.log(name, tag, email);


        // file ka name imageFile hai jo file send ki gyi hai uski key ko show karta hai

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Sorry File format not Supported'
            })
        }

        //  file format are supported
        const response = await uploadFileToCloudinary(file, 'CodeHelp');
        console.log(response);

        // db ke ander entry save
        const fileData = await File.create({
            name,
            tag,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image  successfully uploaded"
        })




    }


    catch (err) {

    }
}
