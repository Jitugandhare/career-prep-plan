import express from 'express';

const express = require('express');
const router = express.Router();
const ResearchAgent = require('../agents/ResearchAgent');

const researchAgent = new ResearchAgent();

// POST /api/research
router.post('/', async (req, res) => {
    try {
        const { message = '' } = req.body;
        let response;

        // Route to appropriate method based on message content
        if (message.toLowerCase().includes('compare') && (message.toLowerCase().includes('vs') || message.toLowerCase().includes('versus'))) {
            const techParts = message.toLowerCase()
                .replace('compare', '')
                .replace(/vs|versus/g, ' ')
                .split()
                .filter(part => part.trim());
            
            const tech1 = techParts[0] || '';
            const tech2 = techParts[techParts.length - 1] || '';
            response = await researchAgent.compareTechnologies(tech1, tech2);
        } else if (message.toLowerCase().includes('trends') || message.toLowerCase().includes('industry')) {
            response = await researchAgent.getIndustryTrends();
        } else {
            response = await researchAgent.searchWeb(message);
        }

        res.json({ 
            success: true,
            response,
            agent: researchAgent.name
        });
    } catch (error) {
        console.error('Error in research endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// GET /api/research/trends
router.get('/trends', async (req, res) => {
    try {
        const response = await researchAgent.getIndustryTrends();
        res.json({ 
            success: true,
            response,
            agent: researchAgent.name
        });
    } catch (error) {
        console.error('Error in trends endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// POST /api/research/technology
router.post('/technology', async (req, res) => {
    try {
        const { technology } = req.body;
        
        if (!technology) {
            return res.status(400).json({ 
                success: false,
                error: 'Technology name is required' 
            });
        }

        const response = await researchAgent.researchTechnology(technology);
        res.json({ 
            success: true,
            response,
            agent: researchAgent.name,
            technology
        });
    } catch (error) {
        console.error('Error in technology research endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// POST /api/research/compare
router.post('/compare', async (req, res) => {
    try {
        const { tech1, tech2 } = req.body;
        
        if (!tech1 || !tech2) {
            return res.status(400).json({ 
                success: false,
                error: 'Both technologies are required for comparison' 
            });
        }

        const response = await researchAgent.compareTechnologies(tech1, tech2);
        res.json({ 
            success: true,
            response,
            agent: researchAgent.name,
            technologies: { tech1, tech2 }
        });
    } catch (error) {
        console.error('Error in technology comparison endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// POST /api/research/search
router.post('/search', async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query) {
            return res.status(400).json({ 
                success: false,
                error: 'Search query is required' 
            });
        }

        const response = await researchAgent.searchWeb(query);
        res.json({ 
            success: true,
            response,
            agent: researchAgent.name,
            query
        });
    } catch (error) {
        console.error('Error in web search endpoint:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
});

module.exports = router;