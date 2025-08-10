import BaseAgent from './baseAgent.js';

class WelcomeAgent extends BaseAgent {
  constructor() {
    super(
      "Greeter",
      "I'm the welcome agent for this portfolio. I can help guide you to the right section based on your interests.",
      "welcome_avatar.png"
    );
  }

  async greet(visitorType = null) {
    let prompt = "";

    switch (visitorType) {
      case "employer":
        prompt = "Generate a friendly, professional greeting for a potential employer visiting a programmer's portfolio website. Mention that they can explore the Projects section to see technical skills and the Career section for professional experience.";
        break;
      case "client":
        prompt = "Generate a friendly, business-oriented greeting for a potential client visiting a programmer's portfolio website. Mention that they can check out the Projects section for examples of past work and the Client section for service details.";
        break;
      case "fellow_programmer":
        prompt = "Generate a friendly, casual greeting for a fellow programmer visiting a portfolio website. Mention that they can explore the Projects section for technical details and code samples.";
        break;
      default:
        prompt = "Generate a friendly, general greeting for a visitor to a programmer's portfolio website. Ask if they are an employer, client, or fellow programmer to provide more tailored information.";
    }

    return await this.getResponse(prompt);
  }

  async suggestSection(interest) {
    const prompt = `Based on a visitor expressing interest in '${interest}', suggest which section of a programmer's portfolio they should visit. Options include: Projects, Career, Client Work, About Me, Contact. Explain why in 1-2 sentences.`;
    return await this.getResponse(prompt);
  }
}

export default WelcomeAgent;
