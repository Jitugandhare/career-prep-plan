import express from 'express';
const express = require('express');
const router = express.Router();
const ClientAgent = require('../agents/ClientAgent');

const clientAgent = new ClientAgent();

// POST /api/client
router.post('/', async (req, res) => {
    try {
        const { message = '' } = req.body;
        let response;

        // Route to appropriate method based on message content
        if (message.toLowerCase().includes('services') || message.toLowerCase().includes('offerings')) {
            response = await clientAgent.getServicesOverview();
        } else if (message.toLowerCase().includes('web') && message.toLowerCase().includes('development')) {
            response = await clientAgent.getServiceDetails('web_development');
        } else if (message.toLowerCase().includes('mobile') && message.toLowerCase().includes('development')) {
            response = await clientAgent.getServiceDetails('mobile_development');
        } else if (message.toLowerCase().includes('consulting') || message.toLowerCase().includes('technical consulting')) {
            response = await clientAgent.getServiceDetails('consulting');
        } else if (message.toLowerCase().includes('process') || message.toLowerCase().includes('how does it work')) {
            response = await clientAgent.explainProcess();
        } else if (message.toLowerCase().includes('proposal') || message.toLowerCase().includes('quote') || message.toLowerCase().includes('estimate')) {
            response = await clientAgent.generateProposal(message);
        } else {
            const prompt = `The user asked: '${message}'. Respond as if you are a client specialist for a portfolio website. Suggest they ask about services, the client engagement process, or request a proposal.`;
            response = await clientAgent.getResponse(prompt);
        }

        res.json({ 
            success: true,
            response,
            agent: clientAgent.name
        });
    } catch (error) {
        console.error('Error in client endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// GET /api/client/services
router.get('/services', async (req, res) => {
    try {
        const response = await clientAgent.getServicesOverview();
        res.json({ 
            success: true,
            response,
            agent: clientAgent.name
        });
    } catch (error) {
        console.error('Error in services endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// GET /api/client/services/:serviceId
router.get('/services/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;
        const response = await clientAgent.getServiceDetails(serviceId);
        res.json({ 
            success: true,
            response,
            agent: clientAgent.name,
            serviceId
        });
    } catch (error) {
        console.error('Error in service details endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// GET /api/client/process
router.get('/process', async (req, res) => {
    try {
        const response = await clientAgent.explainProcess();
        res.json({ 
            success: true,
            response,
            agent: clientAgent.name
        });
    } catch (error) {
        console.error('Error in process endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// POST /api/client/proposal
router.post('/proposal', async (req, res) => {
    try {
        const { projectDescription } = req.body;
        
        if (!projectDescription) {
            return res.status(400).json({ 
                success: false,
                error: 'Project description is required' 
            });
        }

        const response = await clientAgent.generateProposal(projectDescription);
        res.json({ 
            success: true,
            response,
            agent: clientAgent.name
        });
    } catch (error) {
        console.error('Error in proposal endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

module.exports = router;