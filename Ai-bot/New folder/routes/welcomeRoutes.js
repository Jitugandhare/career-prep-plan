import express from 'express';
import WelcomeAgent from '../agents/WelcomeAgent.js';


const welcomeRoute = express.Router();
const welcomeAgent = new WelcomeAgent();


welcomeRoute.post('/', async (req, res) => {
    try {
        const { message = '' } = req.body;
        let visitorType = null;
        let response;

        // Detect visitor type from message
        if (message.toLowerCase().includes('employer')) {
            visitorType = 'employer';
        } else if (message.toLowerCase().includes('client')) {
            visitorType = 'client';
        } else if (message.toLowerCase().includes('programmer') || message.toLowerCase().includes('developer')) {
            visitorType = 'fellow_programmer';
        }

        // Handle interest-based suggestions
        if (message.toLowerCase().includes('interest') || message.toLowerCase().includes('looking for')) {
            const interest = message.replace(/interest|looking for/gi, '').trim();
            response = await welcomeAgent.suggestSection(interest);
        } else {
            response = await welcomeAgent.greet(visitorType);
        }

        res.json({
            success: true,
            response,
            agent: welcomeAgent.name
        });

    } catch (error) {
        console.error('Error in welcome endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

export default welcomeRoute;