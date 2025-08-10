import axios from 'axios';
import dotenv from 'dotenv';
import BaseAgent from './baseAgent.js';

dotenv.config();

class ResearchAgent extends BaseAgent {
  constructor() {
    super(
      "ResearchAssistant",
      "I'm the research specialist. I can search the web for information about technologies, trends, and industry news.",
      "research_avatar.png"
    );

    this.apiKey = process.env.GROQ_API_KEY;
    this.apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  }

  async searchWeb(query) {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful research assistant." },
        { role: "user", content: `Search the web for: ${query}` }
      ],
      tools: [
        {
          type: "web_search"
        }
      ]
    };

    try {
      const response = await axios.post(this.apiUrl, payload, { headers });
      if (response.status === 200) {
        return response.data.choices[0].message.content;
      } else {
        return `Error searching the web: ${response.status} - ${response.statusText}`;
      }
    } catch (error) {
      return `Error searching the web: ${error.message}`;
    }
  }

  async researchTechnology(technology) {
    const query = `latest developments and best practices for ${technology} in software development`;
    const searchResults = await this.searchWeb(query);

    const prompt = `
   Based on the following search results about ${technology}, provide a concise summary of:
  1. What it is
  2. Current state and popularity
  3. Key features and benefits
  4. Common use cases
  5. Future trends

  Search Results:
  ${searchResults}

  Format the response in markdown with appropriate sections.
    `;

    return this.getResponse(prompt);
  }

  async compareTechnologies(tech1, tech2) {
    const query = `comparison between ${tech1} and ${tech2} for software development`;
    const searchResults = await this.searchWeb(query);

    const prompt = `
Based on the following search results comparing ${tech1} and ${tech2}, provide a detailed comparison including:
6. Core differences
7. Performance considerations
8. Learning curve
9. Community support
10. Use case recommendations

Search Results:
${searchResults}

Format the response in markdown with a comparison table and explanatory text.
    `;

    return this.getResponse(prompt);
  }

  async getIndustryTrends() {
    const query = "latest trends in software development industry";
    const searchResults = await this.searchWeb(query);

    const prompt = `
Based on the following search results about software development trends, provide a summary of:
11. Emerging technologies
12. Industry shifts
13. In-demand skills
14. Future predictions

Search Results:
${searchResults}

Format the response in markdown with appropriate sections and highlights.
    `;

    return this.getResponse(prompt);
  }
}

export default ResearchAgent;
