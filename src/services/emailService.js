const { google } = require('googleapis');
const { oauth2Client } = require('../auth/gmailAuth');

const fetchEmails = async () => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const response = await gmail.users.messages.list({ userId: 'me', maxResults: 5 });

    let emails = [];
    for (const msg of response.data.messages) {
        let email = await gmail.users.messages.get({ userId: 'me', id: msg.id });
        emails.push(email.data.snippet);
    }

    return emails;
};

module.exports = { fetchEmails };
