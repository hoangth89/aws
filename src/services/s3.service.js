const {
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const s3Client = require("../config/s3");

const BUCKET_NAME = "nodejs-demo-khanh-20260805";

async function uploadFile(file) {

    const key = `products/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3Client.send(command);

    return {
        key,
        url: `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${key}`
    };

}

module.exports = {
    uploadFile
};