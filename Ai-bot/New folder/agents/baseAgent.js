import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();



class BaseAgent {
  constructor(name, description, avatar = 'default_avatar.png') {
    this.name = name;
    this.description = description;
    this.avatar = avatar;

    this.modelId = "llama-3.3-70b-versatile";
    this.apiKey = process.env.GROQ_API_KEY;
    this.apiUrl = "https://api.groq.com/openai/v1/chat/completions"

  }

  async getResponse(query, stream = false) {

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.modelId,
          messages: [
            { role: 'user', content: query }
          ],
         
          stream: stream
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )
      // console.log(response.data.choices[0].message.content)
      return response.data.choices[0].message.content;

    } catch (error) {

      if (error.response) {

        throw new Error(`Groq API error: ${JSON.stringify(error.response.data)}`)
      } else if (error.request) {
        throw new Error("No response from Groq API");
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  }


  async printResponse(query, stream = false) {
    const res = await this.getResponse(query, stream);
    console.log(`${this.name}:${res}`);
    return res;
  }



}


export default BaseAgent;
