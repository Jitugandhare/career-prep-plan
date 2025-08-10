import BaseAgent from './baseAgent.js'

class CareerAgent extends BaseAgent {
  constructor() {
    super(
      "CareerGuide",
      "I am the career specialist. I can provide information about skills,experience,and job suitability.",
      "career_avatar.png"
    );

    this.skills = {
      languages: ['HTML', 'CSS', 'JavaScript'],
      frameworks: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
      tools: ['Git'],
      soft_skills: [
        "Project management",
        "Agile methodologies",
        "Technical writing",
        "Version control using Git",
        "Responsive design with Tailwind",
        "Component-based development",
        "Problem solving"
      ]
    }


    this.projects = [

      {
        title: "E-commerce Website with Razorpay Integration",
        description:
          "Developed a fully functional e-commerce website with user authentication, product management, and integrated Razorpay for secure payments.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "CSS"],
        features: [
          "User & admin dashboard",
          "Product listing, cart, and checkout system",
          "Online payments via Razorpay",
          "Protected routes with JWT authentication"
        ],
      },
      {
        title: "Insta-Fista Social App",
        description:
          "Built a social media platform where users can post photos, like/comment, and chat in real time.",
        techStack: ["React", "Node.js", "Socket.io", "Express", "MongoDB", "ShadCN UI", "Tailwind CSS"],
        features: [
          "Image upload with preview",
          "Like & comment functionality",
          "Real-time chat using Socket.io",
          "Profile views"
        ],
      },
      {
        title: "Task Management System",
        description:
          "Created a task management web app for teams to manage tasks, assign members, and track status.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        features: [
          "Create, update, delete tasks",
          "Assign tasks to team members",
          "Status tracking and filtering",
          "Responsive dashboard UI"
        ],
      },
    ];
  }

  async getSkillsSummary() {
    const prompt = `Generate a professional summary of the following skills for a portfolio website:
  Programming Languages :${this.skills.languages.join(", ")}
  FrameWorks & Libraries:${this.skills.frameworks.join(', ')}
  Tools & Platforms : ${this.skills.tools.join(', ')}
  Soft Skills: ${this.skills.soft_skills.join(', ')}
  
 Format the response in markdown with appropriate sections and highlights.

  `;

    return await this.getResponse(prompt);
  };


  async getProjectsSummary() {
    let projectsText = '# Projects\n\n';


    this.projects.forEach((project) => {
      projectsText += `## ${project.title}\n`;
      projectsText += `**Description**: ${project.description}\n\n`;
      projectsText += `**Tech Stack**: ${project.techStack.join(', ')}\n\n`;
      projectsText += `**Features**:`;

      project.features.forEach((feature) => {
        projectsText += `-${feature}\n`
      });

      projectsText += `\n`;


    });

    const prompt = `Using the following project details, generate a professional portfolio project summary:
    
    ${projectsText}

    Format the response in markdown with sections,highlights, and concise explanations.
      `;

    return await this.getResponse(prompt);

  }

  async assessJobFit(jobDescription){
    const skillsFlat=[
      ...this.skills.languages,
      ...this.skills.frameworks,
      ...this.skills.tools,
      ...this.skills.soft_skills,
    ];

    const featuresFromProjects=this.projects.flatMap((p)=>p.features);

    const prompt=`
    Assess the fit for the following job description based on the skills and project experience provided:
    Job Description:
    ${jobDescription};

    Skills :
    ${skillsFlat.join(', ')};

    Project Features:

    ${featuresFromProjects.join(', ')};

    Provide an analysis of strengths, potential gaps, and overall suitability for the role. Format the response in markdown.

    `;

    return await this.getResponse(prompt)

  }

}



export default CareerAgent;