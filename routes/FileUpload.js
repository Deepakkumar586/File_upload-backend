const express = require('express');
const router = express.Router();


const { localFileUpload, imageUpload, videoupload, imageSizereducer } = require('../controllers/fileUpload');


// api route
router.post('/localfileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoupload', videoupload);
router.post('/imageSizereducer', imageSizereducer);


module.exports = router;