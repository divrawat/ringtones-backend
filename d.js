const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

const outputDir = 'C:\\Users\\divya\\Desktop\\Ringtones\\ringtones-backend\\uploads';
const failedDownloadsFile = 'Not-Downloaded-Ringtone.txt';
const batchSize = 10;

// Helper to download MP3 files
async function downloadMp3(url, filename) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        const filePath = path.join(outputDir, `${filename}.mp3`);
        await pipeline(response.data, fs.createWriteStream(filePath));
        console.log(`Downloaded: ${filename}`);
    } catch (error) {
        console.error(`Failed to download ${url}:`, error.message);
        fs.appendFileSync(failedDownloadsFile, `"${url}",\n`);
    }
}

// Function to scrape MP3 URL from each page and download it
async function scrapeAndDownload(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const mp3Link = $('.ringtone-full .download-btn-wrap a').attr('href');

        if (mp3Link) {
            const slug = url.split('/').filter(Boolean).pop(); // Extract the slug from the URL
            await downloadMp3(mp3Link, slug); // Use slug as filename
        } else {
            throw new Error('MP3 link not found');
        }
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error.message);
        fs.appendFileSync(failedDownloadsFile, `"${url}",\n`);
    }
}

// Function to process URLs in batches
async function processInBatches(urls, batchSize) {
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.all(batch.map(url => scrapeAndDownload(url)));
        console.log(`Processed batch ${i / batchSize + 1}`);
    }
}

// Main function
async function main(urls) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(failedDownloadsFile, ''); // Clear or create the failed download log file
    await processInBatches(urls, batchSize);
    console.log('All batches processed.');
}

// Example URL list (replace with actual URLs)
const urls = [

];

main(urls);
