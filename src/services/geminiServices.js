require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select the model to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function categorizeEmail(content) {
    try {
        // Create the prompt for categorizing the email
        const prompt = `
            You are an AI that categorizes emails into exactly one of these categories: 
            - "Interested"
            - "Not Interested"
            - "More Information"

            Read the email content provided by the user and classify it into one of these categories.
            ONLY respond with the category name and nothing else.
            
            Email content: "${content}"
        `;

        // Generate the response using Gemini
        const result = await model.generateContent(prompt);
        const category = result.response.text(); // Extract and clean the response
        return category; // 'Interested', 'Not Interested', or 'More Information'
    } catch (err) {
        console.error('Error categorizing email:', err.errors || err.message);
        return 'Not Interested'; // Default fallback category
    }
}

// Export the function for use elsewhere
module.exports = { categorizeEmail };

