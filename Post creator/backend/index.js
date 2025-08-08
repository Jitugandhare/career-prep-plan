require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Web Search with Tavily
async function webSearch(query) {
    const response = await axios.post("https://api.tavily.com/search", {
        api_key: TAVILY_API_KEY,
        query,
        max_results: 5,
        search_depth: "basic"
    });
    return response.data.results.map(r => r.content).join(" ");
}

// Summarization and Post Generation using Gemini
async function generateGeminiResponse(prompt) {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            params: { key: GOOGLE_API_KEY },
            headers: { "Content-Type": "application/json" }
        }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

app.post("/generate", async (req, res) => {
    try {
        const topic = req.body.topic;

        const content = await webSearch(topic);

        const summaryPrompt = `Summarize the following content into 4–5 clear, informative bullet points:\n\n${content}`;
        const summary = await generateGeminiResponse(summaryPrompt);

        const linkedinPost = await generateGeminiResponse(
            `Write a professional LinkedIn post based on this summary:\n${summary}`
        );

        const twitterPost = await generateGeminiResponse(
            `Write a catchy Twitter post under 280 characters based on this summary:\n${summary}`
        );

        const instagramCaption = await generateGeminiResponse(
            `Write an Instagram caption using emojis and friendly tone based on this summary:\n${summary}`
        );

        res.json({
            summary,
            linkedin: linkedinPost,
            twitter: twitterPost,
            instagram: instagramCaption
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
