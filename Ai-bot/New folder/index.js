import dotenv from 'dotenv';
import express from 'express';
import BaseAgent from './agents/baseAgent.js';
import CareerAgent from '../ai-agent-app/agents/careerAgent.js';
import ClientAgent from '../ai-agent-app/agents/clientAgent.js'
import ProjectAgent from '../ai-agent-app/agents/projectAgent.js';
import ResearchAgent from '../ai-agent-app/agents/researchAgent.js'



dotenv.config();

const app = express();
const port = 3000;
const careerAgent = new CareerAgent();
const clientAgent = new ClientAgent();
const projectAgent=new ProjectAgent();

const researchAgent = new ResearchAgent();



app.use(express.json());

// app.post('/chat', async (req, res) => {
//   const { query } = req.body;

//   if (!query) {
//     return res.status(400).json({ error: "Missing query parameter" });
//   }

//   const agent = new BaseAgent("BaseAgent", "General purpose agent");

//   try {
//     const response = await agent.getResponse(query);
//     res.json({ response });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// app.post('/career/projects-summary', async (req, res) => {
//   try {
//     const result = await careerAgent.getProjectsSummary();
//     res.json({ summary: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// app.post('/services/overview', async (req, res) => {
//   try {
//     const result = await clientAgent.getServicesOverview();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post('/services/:id/details', async (req, res) => {
//   try {
//     const result = await clientAgent.getServiceDetails(req.params.id);
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.get('/process', async (req, res) => {
//   try {
//     const result = await clientAgent.explainProcess();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post('/proposal', async (req, res) => {
//   try {
//     const { description } = req.body;
//     const result = await clientAgent.generateProposal(description);
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });


// GET all project summaries


// app.get('/projects', (req, res) => {
//   const list = projectAgent.getProjectList();
//   res.send(list);
// });

// // GET detailed info for one project
// app.get('/projects/:id', async (req, res) => {
//   try {
//     const result = await projectAgent.getProjectDetails(req.params.id);
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // POST a technical question about a project
// app.post('/projects/:id/question', async (req, res) => {
//   try {
//     const { question } = req.body;
//     if (!question) return res.status(400).send("Missing question in request body.");

//     const result = await projectAgent.answerTechnicalQuestion(req.params.id, question);
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });



app.post('/research/technology', async (req, res) => {
  const { technology } = req.body;
  if (!technology) return res.status(400).send("Missing 'technology' in request body");

  try {
    const result = await researchAgent.researchTechnology(technology);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/research/compare', async (req, res) => {
  const { tech1, tech2 } = req.body;
  if (!tech1 || !tech2) return res.status(400).send("Missing 'tech1' or 'tech2'");

  try {
    const result = await researchAgent.compareTechnologies(tech1, tech2);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/research/trends', async (req, res) => {
  try {
    const result = await researchAgent.getIndustryTrends();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})