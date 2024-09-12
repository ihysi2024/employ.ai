const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express();
const PORT = 3001; // You can change this to any available port

app.get('/proxy', async (req, res) => {
    // Get the URL from query parameters
    const targetUrl = req.query.url;

    // Validate the URL
    if (!targetUrl) {
        return res.status(400).send('Error: No URL provided');
    }

    try {
        const response = await fetch(targetUrl);
        const body = await response.text();

        // Load the HTML into Cheerio
        const $ = cheerio.load(body);
        const jobDescription = $('.job-description').text(); // Adjust selector based on actual HTML structure

        res.send({ description: jobDescription });
    } catch (error) {
        res.status(500).send('Error fetching the page');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
