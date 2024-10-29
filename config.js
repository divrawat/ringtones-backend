
require('dotenv').config();

const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    CLOUDFLARE_R2_BUCKET_NAME,
    CLOUDFLARE_R2_SONG_BUCKET_NAME,
    CLOUDFLARE_R2_RINGTONES_BUCKET_NAME
} = process.env;

if (
    !CLOUDFLARE_ACCOUNT_ID ||
    !CLOUDFLARE_R2_ACCESS_KEY_ID ||
    !CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
    !CLOUDFLARE_R2_BUCKET_NAME ||
    !CLOUDFLARE_R2_SONG_BUCKET_NAME
) {
    throw new Error('Missing environment variables.');
}

const cloudflareAccountId = CLOUDFLARE_ACCOUNT_ID;
const cloudflareR2AccessKeyId = CLOUDFLARE_R2_ACCESS_KEY_ID;
const cloudflareR2SecretAccessKey = CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const cloudflareR2BucketName = CLOUDFLARE_R2_BUCKET_NAME;
const cloudflareR2SongBucketName = CLOUDFLARE_R2_SONG_BUCKET_NAME;
const cloudflareR2RingtoneBucketName = CLOUDFLARE_R2_RINGTONES_BUCKET_NAME

module.exports = {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName,
    cloudflareR2SongBucketName,
    cloudflareR2RingtoneBucketName
};
