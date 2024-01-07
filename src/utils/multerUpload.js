const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { ApiError } = require(".");

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    signatureVersion: 'v4',
});

const s3 = new aws.S3();

const multerStorage = multerS3({
    s3,
    bucket: 'hash-dev',
    acl: 'public-read',
    metadata: (req, file, callback) => {
        callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
        callback(null, Date.now().toString());
    },
});

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new ApiError('Please upload image only !', 400), false);
    }
};

const multerUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = multerUpload;
