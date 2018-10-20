const fs = require('fs');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.accessKeyId = process.env.AWS_ACCESS_KEY;
aws.config.secretAccessKey = process.env.AWS_SECRET_KEY;
aws.config.region = process.env.AWS_REGION;

const s3 = new aws.S3();

const storageS3 = multerS3({
  s3: s3,
  bucket: 'depromeet/images',
  acl: 'public-read',
  key: function (req, file, callback) {
    const filename = req.session.user.id + '-' + Date.now();
    callback(null, filename);
  }
});

exports.uploadSingle = multer({storage: storageS3}).single('image');
exports.uploadArray = multer({storage: storageS3}).array('image', 6);