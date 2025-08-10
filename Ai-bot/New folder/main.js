require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import route modules
const welcomeRoutes = require('./routes/welcomeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const careerRoutes = require('./routes/careerRoutes');
const clientRoutes = require('./routes/clientRoutes');
const researchRoutes = require('./routes/researchRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Info endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'Portfolio AI Agents API',
        version: '1.0.0',
        description: 'AI-powered portfolio website API with specialized agents',
        endpoints: {
            welcome: '/api/welcome',
            projects: '/api/project',
            career: '/api/career',
            client: '/api/client',
            research: '/api/research'
        },
        agents: [
            'WelcomeAgent - Greets visitors and provides navigation guidance',
            'ProjectAgent - Provides detailed project information and technical answers',
            'CareerAgent - Shares skills, experience, and job fit assessments',
            'ClientAgent - Handles service inquiries and generates proposals',
            'ResearchAgent - Conducts web searches and technology research'
        ]
    });
});

// Static file routes for default images
app.get(['/static/images/default_avatar.png', '/static/images/default_project.jpg'], (req, res) => {
    // Return a tiny 1x1 transparent GIF as placeholder
    const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.set({
        'Content-Type': 'image/gif',
        'Cache-Control': 'public, max-age=31536000',
        'Expires': 'Thu, 31 Dec 2037 23:59:59 GMT'
    });
    res.send(gif);
});

// Mount API routes
app.use('/api/welcome', welcomeRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/research', researchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl,
        availableEndpoints: [
            '/api',
            '/api/welcome',
            '/api/project',
            '/api/career',
            '/api/client',
            '/api/research',
            '/health'
        ]
    });
});

// Disable caching for development
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        next();
    });
}

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Portfolio API Server running on http://${HOST}:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🤖 AI Agents: Welcome, Project, Career, Client, Research`);
    console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
    console.log(`📖 API info: http://${HOST}:${PORT}/api`);
});

module.exports = app;