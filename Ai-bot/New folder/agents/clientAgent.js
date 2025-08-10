import BaseAgent from './baseAgent.js'


class ClientAgent extends BaseAgent {
  constructor() {
    super(
      "BusinessAdvisor",
      "I'm the client specialist. I can provide information about services, pricing, and project details.",
      "client_avatar.png"
    );


    this.services = {
      web_development: {

        name: "Web Development",
        description: "Custom web application development using modern frameworks and best practices.",
        pricing_model: "Project-based or hourly",
        price_range: "$5,000 - $50,000 depending on complexity",
        timeline: "4-12 weeks depending on scope",
        technologies: ["React", "Node.js"]


      },

      mobile_development: {
        name: "Technical Consulting",
        description: "Expert advice on architecture, technology stack, and development practices.",
        pricing_model: "Hourly",
        price_range: "$150 - $250 per hour",
        timeline: "Ongoing or as needed",
        technologies: ["Various based on client needs"]
      }
    };

    this.process = [
      "Initial consultation to understand requirements",
      "Proposal and quote preparation",
      "Contract signing and project kickoff",
      "Design and prototyping phase",
      "Development sprints with regular client feedback",
      "Testing and quality assurance",
      "Deployment and launch",
      "Post-launch support and maintenance"
    ];
  }

  async getServicesOverview() {
    let servicesText = `# Services Offered\n\n`;

    for (const serviceId in this.services) {
      const service = this.services[serviceId];

      servicesText += `## ${service.name}\n`;
      servicesText += `${service.description}\n`;
      servicesText += `**Pricing Model**:${service.pricing_model}\n`;
      servicesText += `**Timeline**:${service.timeline}\n`;
      servicesText += `**Technologies**:${service.technologies}\n\n`;
    }

    const prompt = `
  Generate a professional overview of the following services for a programmer's portfolio website:
  
  ${servicesText}

  Format the response in markdown with appropriate sections and highlights.
   `;

    return await this.getResponse(prompt);
  }

  async getServiceDetails(serviceId) {
    const service = this.services[serviceId];
    if (!service) {
      return "Service not found. Please check the service ID and try again."
    }

    const prompt = `
    Generate a detailed description for the following service:
    
    Service Name: ${service.name}
    Description:${service.description}
    Pricing Model:${service.pricing_model}
    Pricing Range:${service.price_range}
    Timeline:${service.timeline}
    Technologies:${service.technologies.join(', ')}

    Include information about the value proposition, typical deliverables, and client benefits. Format the response in markdown.
    `;
    return await this.getResponse(prompt);
  }


  async explainProcess() {
    let processText = `# Client Engagement Process\n\n`;

    this.process.forEach((step, index) => {
      processText += `## Step ${index + 1}:${step}\n\n`
    });

    const prompt = `
        Based on the following client engagement process, generate a detailed explanation for potential clients:

${processText}

For each step, provide a brief explanation of what happens, what the client can expect, and any deliverables. Format the response in markdown.
    `;
    return await this.getResponse(prompt)

  }



  async generateProposal(projectDescription) {

    const prompt = `
    Generate a professional project proposal based on the following client requirements:

    Project Description:
    ${projectDescription}

    Include the following sections:
    1. Project Understanding
    2. Proposed Approach
    3. Estimated Timeline
    4. Estimated Budget Range
    5. Next Steps

    Base your proposal on the services and processes described in the portfolio. Format the response in markdown.
    `;

    return await this.getResponse(prompt);
  }





};


export default ClientAgent;
