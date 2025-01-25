const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Generate Google Auth URL
const getAuthURL = () => {
    const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
    return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
};

// Exchange authorization code for tokens and store them
const getAccessToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync('tokens.json', JSON.stringify(tokens));  // Save tokens to a file
    return tokens;
};

// Load tokens from file
const loadTokens = () => {
    try {
        const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
        oauth2Client.setCredentials(tokens);
    } catch (error) {
        console.log("No previous tokens found, please authenticate first.");
    }
};

loadTokens(); // Load stored tokens on startup

module.exports = { getAuthURL, getAccessToken, oauth2Client };
