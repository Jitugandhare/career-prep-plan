import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Zodiac sign information (same as horoscope.js)
const zodiacSigns = {
  aries: { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
  taurus: { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
  gemini: { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
  cancer: { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
  leo: { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
  virgo: { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
  libra: { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
  scorpio: { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
  sagittarius: { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
  capricorn: { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
  aquarius: { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
  pisces: { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'Neptune' }
};

// Planets and their characteristics
const planets = {
  sun: { name: 'Sun', symbol: '☉', nature: 'Benefic', exaltation: 'Aries', debilitation: 'Libra' },
  moon: { name: 'Moon', symbol: '☽', nature: 'Benefic', exaltation: 'Taurus', debilitation: 'Scorpio' },
  mars: { name: 'Mars', symbol: '♂', nature: 'Malefic', exaltation: 'Capricorn', debilitation: 'Cancer' },
  mercury: { name: 'Mercury', symbol: '☿', nature: 'Neutral', exaltation: 'Virgo', debilitation: 'Pisces' },
  jupiter: { name: 'Jupiter', symbol: '♃', nature: 'Benefic', exaltation: 'Cancer', debilitation: 'Capricorn' },
  venus: { name: 'Venus', symbol: '♀', nature: 'Benefic', exaltation: 'Pisces', debilitation: 'Virgo' },
  saturn: { name: 'Saturn', symbol: '♄', nature: 'Malefic', exaltation: 'Libra', debilitation: 'Aries' },
  rahu: { name: 'Rahu', symbol: '☊', nature: 'Malefic', exaltation: 'Taurus', debilitation: 'Scorpio' },
  ketu: { name: 'Ketu', symbol: '☋', nature: 'Malefic', exaltation: 'Scorpio', debilitation: 'Taurus' }
};

// Helper function to get zodiac sign from date
function getZodiacSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

// Helper function to generate planetary positions
function generatePlanetaryPositions(birthDateTime) {
  const positions = {};
  const planetNames = Object.keys(planets);
  
  planetNames.forEach(planet => {
    const sign = getZodiacSign(new Date(birthDateTime.getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000));
    const degree = Math.floor(Math.random() * 30);
    const isRetrograde = Math.random() > 0.8; // 20% chance of retrograde
    
    positions[planet] = {
      sign: sign,
      degree: degree,
      isRetrograde: isRetrograde,
      status: getPlanetStatus(planet, sign)
    };
  });
  
  return positions;
}

// Helper function to get planet status
function getPlanetStatus(planet, sign) {
  const planetInfo = planets[planet];
  if (planetInfo.exaltation === sign) return 'Exalted';
  if (planetInfo.debilitation === sign) return 'Debilitated';
  if (planet === sign) return 'Own Sign';
  return 'Neutral';
}

// Helper function to calculate houses
function calculateHouses(birthDateTime, birthPlace) {
  const houses = [];
  const signs = Object.keys(zodiacSigns);
  
  for (let i = 1; i <= 12; i++) {
    const signIndex = (i - 1) % 12;
    houses.push({
      house: i,
      sign: signs[signIndex],
      lord: zodiacSigns[signs[signIndex]].ruler,
      degree: Math.floor(Math.random() * 30)
    });
  }
  
  return houses;
}

// Helper function to calculate aspects
function calculateAspects(planetaryPositions) {
  const aspects = [];
  const planetNames = Object.keys(planetaryPositions);
  
  for (let i = 0; i < planetNames.length; i++) {
    for (let j = i + 1; j < planetNames.length; j++) {
      const planet1 = planetNames[i];
      const planet2 = planetNames[j];
      const angle = Math.floor(Math.random() * 360);
      
      if (angle <= 10 || (angle >= 170 && angle <= 190) || (angle >= 350)) {
        aspects.push({
          planet1: planet1,
          planet2: planet2,
          angle: angle,
          type: angle <= 10 ? 'Conjunction' : angle >= 170 && angle <= 190 ? 'Opposition' : 'Conjunction'
        });
      }
    }
  }
  
  return aspects;
}

// Helper function to generate analysis
function generateAnalysis(birthDateTime, birthPlace, analysisType) {
  const sign = getZodiacSign(birthDateTime);
  const signInfo = zodiacSigns[sign];
  
  const analysisTemplates = {
    general: {
      personality: `You are a ${signInfo.quality.toLowerCase()} ${signInfo.element.toLowerCase()} sign, ruled by ${signInfo.ruler}. This makes you naturally ${getPersonalityTraits(sign)}.`,
      strengths: getStrengths(sign),
      weaknesses: getWeaknesses(sign),
      advice: getGeneralAdvice(sign)
    },
    career: {
      suitable: getCareerSuggestions(sign),
      timing: getCareerTiming(sign),
      advice: getCareerAdvice(sign)
    },
    love: {
      compatibility: getLoveCompatibility(sign),
      timing: getLoveTiming(sign),
      advice: getLoveAdvice(sign)
    },
    health: {
      focus: getHealthFocus(sign),
      advice: getHealthAdvice(sign)
    },
    finance: {
      approach: getFinanceApproach(sign),
      timing: getFinanceTiming(sign),
      advice: getFinanceAdvice(sign)
    }
  };
  
  return analysisTemplates[analysisType] || analysisTemplates.general;
}

// Helper functions for analysis
function getPersonalityTraits(sign) {
  const traits = {
    aries: 'courageous and energetic',
    taurus: 'patient and reliable',
    gemini: 'adaptable and communicative',
    cancer: 'nurturing and protective',
    leo: 'creative and passionate',
    virgo: 'analytical and practical',
    libra: 'diplomatic and fair-minded',
    scorpio: 'passionate and determined',
    sagittarius: 'optimistic and adventurous',
    capricorn: 'responsible and disciplined',
    aquarius: 'progressive and independent',
    pisces: 'compassionate and intuitive'
  };
  return traits[sign] || 'unique and special';
}

function getStrengths(sign) {
  const strengths = {
    aries: ['Leadership', 'Courage', 'Energy', 'Pioneering spirit'],
    taurus: ['Reliability', 'Patience', 'Determination', 'Practicality'],
    gemini: ['Communication', 'Adaptability', 'Intelligence', 'Versatility'],
    cancer: ['Nurturing', 'Intuition', 'Protectiveness', 'Loyalty'],
    leo: ['Creativity', 'Generosity', 'Leadership', 'Warmth'],
    virgo: ['Analytical thinking', 'Attention to detail', 'Reliability', 'Practicality'],
    libra: ['Diplomacy', 'Fairness', 'Social skills', 'Balance'],
    scorpio: ['Determination', 'Intensity', 'Strategic thinking', 'Loyalty'],
    sagittarius: ['Optimism', 'Adventure', 'Philosophy', 'Honesty'],
    capricorn: ['Responsibility', 'Discipline', 'Ambition', 'Patience'],
    aquarius: ['Innovation', 'Independence', 'Humanitarianism', 'Intelligence'],
    pisces: ['Compassion', 'Creativity', 'Intuition', 'Empathy']
  };
  return strengths[sign] || ['Unique perspective', 'Adaptability', 'Growth potential'];
}

function getWeaknesses(sign) {
  const weaknesses = {
    aries: ['Impatience', 'Aggression', 'Impulsiveness'],
    taurus: ['Stubbornness', 'Possessiveness', 'Resistance to change'],
    gemini: ['Indecisiveness', 'Restlessness', 'Superficiality'],
    cancer: ['Moodiness', 'Over-sensitivity', 'Clinginess'],
    leo: ['Arrogance', 'Drama', 'Attention-seeking'],
    virgo: ['Perfectionism', 'Over-criticism', 'Worry'],
    libra: ['Indecisiveness', 'Conflict avoidance', 'People-pleasing'],
    scorpio: ['Jealousy', 'Secretiveness', 'Vengefulness'],
    sagittarius: ['Impatience', 'Bluntness', 'Restlessness'],
    capricorn: ['Pessimism', 'Rigidity', 'Workaholism'],
    aquarius: ['Detachment', 'Rebelliousness', 'Unpredictability'],
    pisces: ['Escapism', 'Oversensitivity', 'Indecisiveness']
  };
  return weaknesses[sign] || ['Learning and growth opportunities'];
}

function getGeneralAdvice(sign) {
  const advice = {
    aries: 'Learn to be more patient and consider others\' perspectives.',
    taurus: 'Embrace change and be more flexible in your approach.',
    gemini: 'Focus on depth and follow through with your commitments.',
    cancer: 'Develop emotional boundaries and avoid over-attachment.',
    leo: 'Practice humility and consider others\' needs.',
    virgo: 'Learn to accept imperfection and reduce self-criticism.',
    libra: 'Make decisions confidently and stand up for yourself.',
    scorpio: 'Practice forgiveness and open up to trust.',
    sagittarius: 'Develop patience and consider practical details.',
    capricorn: 'Allow yourself to have fun and be less rigid.',
    aquarius: 'Connect emotionally and be more present with others.',
    pisces: 'Stay grounded and develop practical skills.'
  };
  return advice[sign] || 'Focus on personal growth and self-awareness.';
}

function getCareerSuggestions(sign) {
  const careers = {
    aries: ['Entrepreneur', 'Manager', 'Athlete', 'Military', 'Sales'],
    taurus: ['Banker', 'Chef', 'Architect', 'Real Estate', 'Agriculture'],
    gemini: ['Journalist', 'Teacher', 'Writer', 'Marketing', 'Public Relations'],
    cancer: ['Nurse', 'Counselor', 'Chef', 'Real Estate', 'Social Worker'],
    leo: ['Actor', 'Manager', 'Politician', 'Teacher', 'Sales'],
    virgo: ['Accountant', 'Editor', 'Researcher', 'Healthcare', 'Administration'],
    libra: ['Lawyer', 'Diplomat', 'Designer', 'HR Manager', 'Mediator'],
    scorpio: ['Detective', 'Psychologist', 'Researcher', 'Surgeon', 'Investigator'],
    sagittarius: ['Travel Agent', 'Teacher', 'Writer', 'Explorer', 'Religious Leader'],
    capricorn: ['CEO', 'Accountant', 'Engineer', 'Manager', 'Politician'],
    aquarius: ['Scientist', 'Inventor', 'Social Worker', 'Technologist', 'Humanitarian'],
    pisces: ['Artist', 'Musician', 'Counselor', 'Nurse', 'Spiritual Leader']
  };
  return careers[sign] || ['Career that matches your interests and skills'];
}

function getCareerAdvice(sign) {
  const advice = {
    aries: 'Take leadership roles and use your natural drive.',
    taurus: 'Focus on stability and build long-term success.',
    gemini: 'Use your communication skills and stay adaptable.',
    cancer: 'Follow your intuition and create nurturing environments.',
    leo: 'Showcase your creativity and natural leadership.',
    virgo: 'Use your attention to detail and analytical skills.',
    libra: 'Leverage your diplomatic skills and sense of fairness.',
    scorpio: 'Use your determination and strategic thinking.',
    sagittarius: 'Embrace opportunities for growth and learning.',
    capricorn: 'Build solid foundations and work systematically.',
    aquarius: 'Innovate and think outside the box.',
    pisces: 'Use your creativity and compassion in your work.'
  };
  return advice[sign] || 'Focus on your strengths and continue learning.';
}

function getLoveCompatibility(sign) {
  const compatibility = {
    aries: ['Leo', 'Sagittarius', 'Gemini'],
    taurus: ['Virgo', 'Capricorn', 'Cancer'],
    gemini: ['Libra', 'Aquarius', 'Aries'],
    cancer: ['Scorpio', 'Pisces', 'Taurus'],
    leo: ['Aries', 'Sagittarius', 'Libra'],
    virgo: ['Taurus', 'Capricorn', 'Cancer'],
    libra: ['Gemini', 'Aquarius', 'Leo'],
    scorpio: ['Cancer', 'Pisces', 'Capricorn'],
    sagittarius: ['Aries', 'Leo', 'Aquarius'],
    capricorn: ['Taurus', 'Virgo', 'Scorpio'],
    aquarius: ['Gemini', 'Libra', 'Sagittarius'],
    pisces: ['Cancer', 'Scorpio', 'Taurus']
  };
  return compatibility[sign] || ['All signs have potential for love'];
}

function getLoveAdvice(sign) {
  const advice = {
    aries: 'Learn patience and consider your partner\'s needs.',
    taurus: 'Be more flexible and open to change.',
    gemini: 'Focus on emotional depth and commitment.',
    cancer: 'Balance nurturing with independence.',
    leo: 'Share the spotlight and practice humility.',
    virgo: 'Accept imperfection and be less critical.',
    libra: 'Make decisions and stand up for yourself.',
    scorpio: 'Practice trust and let go of jealousy.',
    sagittarius: 'Develop emotional depth and patience.',
    capricorn: 'Allow yourself to be vulnerable and have fun.',
    aquarius: 'Connect emotionally and be more present.',
    pisces: 'Stay grounded and set healthy boundaries.'
  };
  return advice[sign] || 'Focus on communication and mutual understanding.';
}

function getHealthFocus(sign) {
  const health = {
    aries: ['Head', 'Eyes', 'Brain', 'Cardiovascular system'],
    taurus: ['Throat', 'Neck', 'Thyroid', 'Digestive system'],
    gemini: ['Lungs', 'Arms', 'Nervous system', 'Respiratory system'],
    cancer: ['Stomach', 'Breasts', 'Digestive system', 'Emotional health'],
    leo: ['Heart', 'Spine', 'Circulatory system', 'Back'],
    virgo: ['Digestive system', 'Intestines', 'Nervous system', 'Immune system'],
    libra: ['Kidneys', 'Lower back', 'Skin', 'Endocrine system'],
    scorpio: ['Reproductive organs', 'Colon', 'Elimination system', 'Emotional health'],
    sagittarius: ['Hips', 'Thighs', 'Liver', 'Nervous system'],
    capricorn: ['Bones', 'Joints', 'Teeth', 'Skeletal system'],
    aquarius: ['Circulatory system', 'Ankles', 'Nervous system', 'Mental health'],
    pisces: ['Feet', 'Lymphatic system', 'Immune system', 'Mental health']
  };
  return health[sign] || ['Overall wellness and balance'];
}

function getHealthAdvice(sign) {
  const advice = {
    aries: 'Focus on stress management and cardiovascular health.',
    taurus: 'Maintain a balanced diet and regular exercise routine.',
    gemini: 'Practice breathing exercises and mental relaxation.',
    cancer: 'Focus on emotional well-being and digestive health.',
    leo: 'Maintain heart health and practice stress management.',
    virgo: 'Focus on digestive health and stress reduction.',
    libra: 'Maintain kidney health and practice balance in all areas.',
    scorpio: 'Focus on emotional health and elimination system.',
    sagittarius: 'Maintain liver health and practice moderation.',
    capricorn: 'Focus on bone health and stress management.',
    aquarius: 'Maintain circulatory health and mental well-being.',
    pisces: 'Focus on immune system and mental health.'
  };
  return advice[sign] || 'Maintain a balanced lifestyle and regular check-ups.';
}

function getFinanceApproach(sign) {
  const approaches = {
    aries: 'Aggressive and risk-taking',
    taurus: 'Conservative and stable',
    gemini: 'Diversified and adaptable',
    cancer: 'Security-focused and emotional',
    leo: 'Generous and status-oriented',
    virgo: 'Analytical and careful',
    libra: 'Balanced and fair',
    scorpio: 'Strategic and secretive',
    sagittarius: 'Optimistic and adventurous',
    capricorn: 'Disciplined and long-term',
    aquarius: 'Innovative and unconventional',
    pisces: 'Intuitive and compassionate'
  };
  return approaches[sign] || 'Balanced and thoughtful';
}

function getFinanceTiming(sign) {
  const timing = {
    aries: 'Best during Mars transits and new beginnings',
    taurus: 'Best during Venus transits and stable periods',
    gemini: 'Best during Mercury transits and communication phases',
    cancer: 'Best during Moon transits and emotional stability',
    leo: 'Best during Sun transits and leadership periods',
    virgo: 'Best during Mercury transits and analytical phases',
    libra: 'Best during Venus transits and partnership periods',
    scorpio: 'Best during Pluto transits and transformation phases',
    sagittarius: 'Best during Jupiter transits and expansion periods',
    capricorn: 'Best during Saturn transits and disciplined phases',
    aquarius: 'Best during Uranus transits and innovative periods',
    pisces: 'Best during Neptune transits and intuitive phases'
  };
  return timing[sign] || 'Focus on long-term planning and stability';
}

function getFinanceAdvice(sign) {
  const advice = {
    aries: 'Learn patience and long-term planning.',
    taurus: 'Continue your stable approach and diversify.',
    gemini: 'Focus on consistency and follow-through.',
    cancer: 'Balance emotional decisions with practical planning.',
    leo: 'Practice moderation and avoid overspending.',
    virgo: 'Trust your analytical skills and maintain discipline.',
    libra: 'Make decisions confidently and avoid indecision.',
    scorpio: 'Use your strategic thinking and maintain privacy.',
    sagittarius: 'Practice moderation and long-term planning.',
    capricorn: 'Continue your disciplined approach and allow some flexibility.',
    aquarius: 'Use your innovative thinking while maintaining stability.',
    pisces: 'Stay grounded and avoid emotional spending.'
  };
  return advice[sign] || 'Focus on balanced and sustainable financial practices.';
}

function getCareerTiming(sign) {
  return 'Best during planetary transits that support your sign\'s natural qualities.';
}

function getLoveTiming(sign) {
  return 'Best during Venus transits and when your ruling planet is strong.';
}



// Generate Kundali (Birth Chart)
router.post('/generate', 
  protect,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('birthDate').isISO8601().withMessage('Valid birth date is required'),
    body('birthTime').notEmpty().withMessage('Birth time is required'),
    body('birthPlace').notEmpty().withMessage('Birth place is required'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender should be male, female, or other')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, birthDate, birthTime, birthPlace, gender } = req.body;
      const birthDateTime = new Date(`${birthDate}T${birthTime}`);
      
      // Calculate basic astrological information
      const zodiacSign = getZodiacSign(birthDateTime);
      const planetaryPositions = generatePlanetaryPositions(birthDateTime);
      const houses = calculateHouses(birthDateTime, birthPlace);
      const aspects = calculateAspects(planetaryPositions);
      
      res.json({
        success: true,
        data: {
          personalInfo: {
            name,
            birthDate: birthDate,
            birthTime: birthTime,
            birthPlace: birthPlace,
            gender
          },
          birthChart: {
            zodiacSign,
            planetaryPositions,
            houses,
            aspects
          },
          summary: {
            sunSign: zodiacSign,
            moonSign: planetaryPositions.moon?.sign || zodiacSign,
            risingSign: houses[0]?.sign || zodiacSign,
            dominantPlanet: zodiacSigns[zodiacSign].ruler,
            element: zodiacSigns[zodiacSign].element,
            quality: zodiacSigns[zodiacSign].quality
          }
        }
      });
    } catch (error) {
      console.error('Kundali generation error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to generate Kundali',
        error: error.message 
      });
    }
  }
);

// Analyze Kundali
router.post('/analysis', 
  protect,
  [
    body('birthDate').isISO8601().withMessage('Valid birth date is required'),
    body('birthTime').notEmpty().withMessage('Birth time is required'),
    body('birthPlace').notEmpty().withMessage('Birth place is required'),
    body('analysisType').optional().isIn(['general', 'career', 'love', 'health', 'finance']).withMessage('Analysis type should be general, career, love, health, or finance')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { birthDate, birthTime, birthPlace, analysisType = 'general' } = req.body;
      const birthDateTime = new Date(`${birthDate}T${birthTime}`);
      
      // Get basic astrological information
      const zodiacSign = getZodiacSign(birthDateTime);
      const planetaryPositions = generatePlanetaryPositions(birthDateTime);
      
      // Generate analysis
      const analysis = generateAnalysis(birthDateTime, birthPlace, analysisType);
      
      res.json({
        success: true,
        data: {
          basicInfo: {
            zodiacSign,
            moonSign: planetaryPositions.moon?.sign || zodiacSign,
            risingSign: zodiacSign, // Simplified
            element: zodiacSigns[zodiacSign].element,
            quality: zodiacSigns[zodiacSign].quality
          },
          analysisType,
          analysis,
          recommendations: getGeneralAdvice(zodiacSign)
        }
      });
    } catch (error) {
      console.error('Kundali analysis error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to analyze Kundali',
        error: error.message 
      });
    }
  }
);

// Compatibility Analysis
router.post('/compatibility', 
  protect,
  [
    body('person1').isObject().withMessage('Person 1 details are required'),
    body('person1.birthDate').isISO8601().withMessage('Person 1 birth date is required'),
    body('person1.birthTime').notEmpty().withMessage('Person 1 birth time is required'),
    body('person1.birthPlace').notEmpty().withMessage('Person 1 birth place is required'),
    body('person2').isObject().withMessage('Person 2 details are required'),
    body('person2.birthDate').isISO8601().withMessage('Person 2 birth date is required'),
    body('person2.birthTime').notEmpty().withMessage('Person 2 birth time is required'),
    body('person2.birthPlace').notEmpty().withMessage('Person 2 birth place is required'),
    body('compatibilityType').optional().isIn(['romantic', 'business', 'friendship', 'general']).withMessage('Compatibility type should be romantic, business, friendship, or general')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { person1, person2, compatibilityType = 'general' } = req.body;
      
      const person1DateTime = new Date(`${person1.birthDate}T${person1.birthTime}`);
      const person2DateTime = new Date(`${person2.birthDate}T${person2.birthTime}`);
      
      // Get basic information for both persons
      const person1Sign = getZodiacSign(person1DateTime);
      const person2Sign = getZodiacSign(person2DateTime);
      
      const person1Info = {
        zodiacSign: person1Sign,
        element: zodiacSigns[person1Sign].element,
        quality: zodiacSigns[person1Sign].quality
      };
      
      const person2Info = {
        zodiacSign: person2Sign,
        element: zodiacSigns[person2Sign].element,
        quality: zodiacSigns[person2Sign].quality
      };
      
      // Calculate compatibility score (simplified)
      const compatibilityScore = calculateCompatibilityScore(person1Sign, person2Sign, compatibilityType);
      
      res.json({
        success: true,
        data: {
          person1: person1Info,
          person2: person2Info,
          compatibilityType,
          overallScore: compatibilityScore.overall,
          scores: compatibilityScore.details,
          recommendations: getCompatibilityAdvice(person1Sign, person2Sign, compatibilityType)
        }
      });
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to analyze compatibility',
        error: error.message 
      });
    }
  }
);

// Helper function to calculate compatibility score
function calculateCompatibilityScore(sign1, sign2, type) {
  const elementCompatibility = {
    Fire: { Fire: 80, Earth: 60, Air: 90, Water: 40 },
    Earth: { Fire: 60, Earth: 80, Air: 40, Water: 90 },
    Air: { Fire: 90, Earth: 40, Air: 80, Water: 60 },
    Water: { Fire: 40, Earth: 90, Air: 60, Water: 80 }
  };
  
  const element1 = zodiacSigns[sign1].element;
  const element2 = zodiacSigns[sign2].element;
  
  const elementScore = elementCompatibility[element1][element2];
  const overall = Math.floor(elementScore + Math.random() * 20);
  
  return {
    overall: Math.min(overall, 100),
    details: {
      element: elementScore,
      communication: Math.floor(70 + Math.random() * 30),
      emotional: Math.floor(60 + Math.random() * 40),
      physical: Math.floor(65 + Math.random() * 35)
    }
  };
}

// Helper function to get compatibility advice
function getCompatibilityAdvice(sign1, sign2, type) {
  const element1 = zodiacSigns[sign1].element;
  const element2 = zodiacSigns[sign2].element;
  
  if (element1 === element2) {
    return 'You share the same element, which creates strong understanding and harmony.';
  } else if ((element1 === 'Fire' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Fire')) {
    return 'Fire and Air create an exciting and dynamic relationship with great communication.';
  } else if ((element1 === 'Earth' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Earth')) {
    return 'Earth and Water create a nurturing and stable relationship with deep emotional connection.';
  } else {
    return 'Your different elements can create challenges but also opportunities for growth and learning.';
  }
}

// Get planetary positions for a specific date
router.post('/planetary-positions', 
  protect,
  [
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').optional().isString().withMessage('Time should be a string'),
    body('place').optional().isString().withMessage('Place should be a string')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { date, time, place } = req.body;
      const dateTime = time ? new Date(`${date}T${time}`) : new Date(date);
      
      // Get planetary positions
      const planetaryPositions = generatePlanetaryPositions(dateTime);
      
      // Get current zodiac sign
      const zodiacSign = getZodiacSign(dateTime);
      
      res.json({
        success: true,
        data: {
          date: date,
          time: time,
          place: place,
          zodiacSign,
          planetaryPositions
        }
      });
    } catch (error) {
      console.error('Planetary positions error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to get planetary positions',
        error: error.message 
      });
    }
  }
);

export default router;
