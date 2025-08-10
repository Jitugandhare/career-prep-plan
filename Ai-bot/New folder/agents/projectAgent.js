import BaseAgent from './baseAgent.js';


class ProjectAgent extends BaseAgent {
  constructor() {
    super(
      "TechExpert",
      "I'm the project specialist. I can provide detailed information about any project in this portfolio.",
      "project_avatar.png"
    )


    this.projects = {
      project1: {
        name: "Shoplique",
        tech_stack: ["React", "Node.js", "Express", "MongoDb", "Redux", "CSS"],
        description: "A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.",
        highlights: [
          "User authentication & profile management",
          "Product filtering & search",
          "Shopping cart with live updates",
          "Razorpay integration",
          "Role-based admin panel",
          "Review system with moderation"
        ],
        github_link: "https://github.com/Jitugandhare/Shoplique",
        demo_link: "https://shoplique.onrender.com"
      },

      project2: {
        name: "Task Management",
        tech_stack: ["React", "Node.js", "Express", "MongoDb", "Tailwind CSS"],
        description: "A task management application with collaborative features, and progress tracking.",
        highlights: ["Responsive design", "Status Updates", "Role-based Access Control", "Status & Priority Management",
          "Drag-and-drop Tasks", "RESTFUL API", "User collaboration", "Progressive Web App", "JWT authentication"],
        github_link: "https://github.com/Jitugandhare/Task-management",
        demo_link: "https://task-management-2-imev.onrender.com/"
      },

      project3: {
        name: "Insta-Fista - Social Media App",
        tech_stack: [
          "React.js", "Redux", "ShadCN UI",
          "Node.js", "Express.js", "MongoDB",
          "Socket.io"
        ],
        description: "A real-time social media app with features like posts, likes, comments, chat, and notifications.",
        highlights: [
          "JWT Authentication",
          "Image upload support",
          "Real-time likes, comments, and follow alerts",
          "One-on-one chat using Socket.io",
          "Redux-managed global state",
          "Clean UI using ShadCN"
        ],
        github_link: "https://github.com/Jitugandhare/Insta",
        demo_link: "https://new-jfuz.onrender.com/"
      }
    }



  }

  getProjectList() {

    let projectList = "# Available Projects\n\n";
    for (const projectId in this.projects) {
      const project = this.projects[projectId];
      projectList += `## ${project.name}\n`;
      projectList += `**Tech Stack**: ${project.tech_stack.join(', ')}\n`;
      projectList += `${project.description}\n\n`
    }

    return projectList;
  }

  async getProjectDetails(projectId) {
    const project = this.projects[projectId];

    if (!project) {
      return `Project not found. Please check the project ID and try again.`
    }

    const prompt = `
    Generate a detailed description for the following project:
    
    
    Project Name : ${project.name}
    Tech Stack:${project.tech_stack.join(', ')}
    Description:${project.description}
    Highlights:${project.highlights.join(', ')}
    GitHub:${project.github_link}
    Demo:${project.demo_link}

    Include technical details about implementation challenges and solutions. Format the response in markdown.

    `;

    return await this.getResponse(prompt);

  }

  

  async answerTechnicalQuestion(projectId, question) {
    const project = this.projects[projectId];

    if (!project) {
      return `Project not found. Please check the project ID and try again.`
    };

    const prompt = `Answer the following technical question about this project:
    
    Project Name:${project.name}
    Tech Stack:${project.tech_stack.join(', ')}
    Description:${project.description}
    Highlights:${project.highlights.join(', ')}


    Question:${question}


    Provide a detailed technical answer with code examples if relevant.
        `;

    return await this.getResponse(prompt);

  }


}



export default ProjectAgent