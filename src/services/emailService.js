const { google } = require('googleapis');
const { oauth2Client } = require('../auth/gmailAuth');

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function fetchEmails() {
    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 5, // Adjust as needed
        });

        const messages = res.data.messages || [];

        const emailDetails = await Promise.all(
            messages.map(async (message) => {
                const msg = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                });

                const headers = msg.data.payload.headers;
                const subject = headers.find(header => header.name === 'Subject')?.value || "No Subject";
                const from = headers.find(header => header.name === 'From')?.value || "Unknown Sender";

                // Extract email body
                let body = "";
                if (msg.data.payload.parts) {
                    // If email has multiple parts, get text/plain version
                    const part = msg.data.payload.parts.find(p => p.mimeType === 'text/plain');
                    if (part && part.body.data) {
                        body = Buffer.from(part.body.data, 'base64').toString();
                    }
                } else if (msg.data.payload.body.data) {
                    // If email is plain text without multiple parts
                    body = Buffer.from(msg.data.payload.body.data, 'base64').toString();
                }

                return { subject, from, body };
            })
        );

        return emailDetails;
    } catch (error) {
        console.error("Error fetching emails:", error);
        return [];
    }
}

module.exports = { fetchEmails };
