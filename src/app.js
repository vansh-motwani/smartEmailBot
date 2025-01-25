require('dotenv').config();
const express = require('express');
const { getAuthURL, getAccessToken, oauth2Client } = require('./auth/gmailAuth');
const { fetchEmails } = require('./services/emailService');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Email Parser Bot is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/auth/google', (req, res) => {
    res.redirect(getAuthURL());
});

app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    const tokens = await getAccessToken(code);
    res.json({ message: "Authentication successful!", tokens });
});

app.get('/emails', async (req, res) => {
    if (!oauth2Client.credentials.access_token) {
        return res.status(401).json({ error: "Unauthorized. Please authenticate first." });
    }
    const emails = await fetchEmails();
    res.json(emails);
});
