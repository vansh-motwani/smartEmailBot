const express = require("express");
const bodyParser = require("body-parser");
const { startEmailPolling } = require("./services/gmailProcessing");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.send("Email Categorization Service is running!");
});

app.get('/auth/google', (req, res) => {
    res.redirect(getAuthURL());
});

app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    const tokens = await getAccessToken(code);
    res.json({ message: "Authentication successful!", tokens });
});

// Start email polling
console.log("Starting email polling service...");
startEmailPolling(10000); // Poll every 60 seconds

// Error handler
app.use((err, req, res, next) => {
    console.error("An error occurred:", err.stack);
    res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
