const {
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client
} = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // Use crypto instead of md5

const {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2RingtoneBucketName
} = require('./config.js');

// Initialize S3 client
const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${cloudflareAccountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: cloudflareR2AccessKeyId,
        secretAccessKey: cloudflareR2SecretAccessKey,
    },
});

// Function to recursively get file list
const getFileList = (dirName) => {
    let files = [];
    const items = fs.readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [...files, ...getFileList(`${dirName}/${item.name}`)];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    }

    return files;
};

const files = getFileList('uploads');
const failedUploadsFilePath = path.join(__dirname, 'failed-R2-Ringtones-cloudflare-uploads.txt');

// Function to append failed file paths to a text file
const logFailedUpload = (filePath) => {
    fs.appendFileSync(failedUploadsFilePath, `${filePath}\n`, 'utf8');
};

// Function to generate MD5 hash using crypto
const generateMD5Hash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);
    return hash.digest('hex');
};

// Function to upload a file
const uploadFile = async (file) => {
    try {
        const fileStream = fs.readFileSync(file);
        const fileName = file.replace(/uploads\//g, '');

        if (fileName.includes('.gitkeep')) return;

        console.log(fileName);

        const uploadParams = {
            Bucket: cloudflareR2RingtoneBucketName,
            Key: fileName,
            Body: fileStream,
            ContentLength: fs.statSync(file).size,
            ContentType: 'audio/mpeg'
        };

        const cmd = new PutObjectCommand(uploadParams);

        // Generate MD5 hash for ETag header
        const digest = generateMD5Hash(file);

        cmd.middlewareStack.add((next) => (args) => {
            if (args.request && args.request.headers) {
                args.request.headers['if-none-match'] = `"${digest}"`;
            }
            return next(args);
        }, {
            step: 'build',
            name: 'addETag'
        });

        const data = await S3.send(cmd);
        console.log(`Success - Status Code: ${data.$metadata.httpStatusCode}`);
    } catch (err) {
        if (err.hasOwnProperty('$metadata')) {
            console.error(`Error - Status Code: ${err.$metadata.httpStatusCode} - ${err.message}`);
        } else {
            console.error('Error', err);
        }
        logFailedUpload(file);  // Log failed uploads
    }
};

// Function to upload all files sequentially
const uploadFilesSequentially = async () => {
    for (const file of files) {
        await uploadFile(file); // Wait for each file to upload before continuing
    }
    console.log('All files uploaded');
};

uploadFilesSequentially().catch(err => {
    console.error('Error in file upload process', err);
});
