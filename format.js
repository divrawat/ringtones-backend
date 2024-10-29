const fs = require('fs');

// Read the URLs from ringtones.txt
fs.readFile('ringtones.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the URLs by new line, trim whitespace, and format them with quotes
    const formattedUrls = data.split('\n')
        .map(url => `"${url.trim()}"`) // Add quotes around each URL
        .join(',\n'); // Join them back with a comma and newline

    // Save the formatted URLs to the same file or a new file
    fs.writeFile('formatted_ringtones.txt', formattedUrls, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Formatted URLs saved to formatted_ringtones.txt');
        }
    });
});
