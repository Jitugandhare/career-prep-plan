import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Zodiac sign information
const zodiacSigns = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    quality: 'Cardinal',
    ruler: 'Mars',
    dates: 'March 21 - April 19',
    traits: ['Courageous', 'Energetic', 'Willful', 'Pioneering', 'Independent']
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    quality: 'Fixed',
    ruler: 'Venus',
    dates: 'April 20 - May 20',
    traits: ['Patient', 'Reliable', 'Devoted', 'Persistent', 'Determined']
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    quality: 'Mutable',
    ruler: 'Mercury',
    dates: 'May 21 - June 20',
    traits: ['Adaptable', 'Versatile', 'Communicative', 'Witty', 'Intellectual']
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    quality: 'Cardinal',
    ruler: 'Moon',
    dates: 'June 21 - July 22',
    traits: ['Nurturing', 'Protective', 'Sympathetic', 'Moody', 'Tenacious']
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    quality: 'Fixed',
    ruler: 'Sun',
    dates: 'July 23 - August 22',
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful']
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    quality: 'Mutable',
    ruler: 'Mercury',
    dates: 'August 23 - September 22',
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical']
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    quality: 'Cardinal',
    ruler: 'Venus',
    dates: 'September 23 - October 22',
    traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Peaceful']
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    quality: 'Fixed',
    ruler: 'Pluto',
    dates: 'October 23 - November 21',
    traits: ['Passionate', 'Determined', 'Magnetic', 'Mysterious', 'Strategic']
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    quality: 'Mutable',
    ruler: 'Jupiter',
    dates: 'November 22 - December 21',
    traits: ['Optimistic', 'Adventurous', 'Independent', 'Honest', 'Philosophical']
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    quality: 'Cardinal',
    ruler: 'Saturn',
    dates: 'December 22 - January 19',
    traits: ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient']
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    quality: 'Fixed',
    ruler: 'Uranus',
    dates: 'January 20 - February 18',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual']
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    quality: 'Mutable',
    ruler: 'Neptune',
    dates: 'February 19 - March 20',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Musical']
  }
};

// Horoscope templates
const horoscopeTemplates = {
  daily: {
    aries: [
      "Today brings a surge of energy and motivation. Your natural leadership qualities will shine through in any group setting.",
      "The stars align to support your ambitious nature. Take calculated risks and trust your instincts.",
      "Communication with colleagues and friends will be particularly rewarding today."
    ],
    taurus: [
      "Your practical approach to problem-solving will be highly valued today. Focus on stability and long-term goals.",
      "Financial matters may require your attention. Your careful planning will pay off.",
      "Relationships benefit from your patient and understanding nature."
    ],
    gemini: [
      "Your communication skills are at their peak today. Express your ideas clearly and connect with others.",
      "Learning something new will bring you great satisfaction. Stay curious and open-minded.",
      "Social interactions will be particularly enjoyable and fruitful."
    ],
    cancer: {
      name: 'Cancer',
      symbol: '♋',
      element: 'Water',
      quality: 'Cardinal',
      ruler: 'Moon',
      dates: 'June 21 - July 22',
      traits: ['Nurturing', 'Protective', 'Sympathetic', 'Moody', 'Tenacious']
    },
    leo: {
      name: 'Leo',
      symbol: '♌',
      element: 'Fire',
      quality: 'Fixed',
      ruler: 'Sun',
      dates: 'July 23 - August 22',
      traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful']
    },
    virgo: {
      name: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      quality: 'Mutable',
      ruler: 'Mercury',
      dates: 'August 23 - September 22',
      traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical']
    },
    libra: {
      name: 'Libra',
      symbol: '♎',
      element: 'Air',
      quality: 'Cardinal',
      ruler: 'Venus',
      dates: 'September 23 - October 22',
      traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Peaceful']
    },
    scorpio: {
      name: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      quality: 'Fixed',
      ruler: 'Pluto',
      dates: 'October 23 - November 21',
      traits: ['Passionate', 'Determined', 'Magnetic', 'Mysterious', 'Strategic']
    },
    sagittarius: {
      name: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      quality: 'Mutable',
      ruler: 'Jupiter',
      dates: 'November 22 - December 21',
      traits: ['Optimistic', 'Adventurous', 'Independent', 'Honest', 'Philosophical']
    },
    capricorn: {
      name: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      quality: 'Cardinal',
      ruler: 'Saturn',
      dates: 'December 22 - January 19',
      traits: ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient']
    },
    aquarius: {
      name: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      quality: 'Fixed',
      ruler: 'Uranus',
      dates: 'January 20 - February 18',
      traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual']
    },
    pisces: {
      name: 'Pisces',
      symbol: '♓',
      element: 'Water',
      quality: 'Mutable',
      ruler: 'Neptune',
      dates: 'February 19 - March 20',
      traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Musical']
    }
  }
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

// Helper function to generate horoscope text
function generateHoroscope(sign, type) {
  const templates = {
    daily: [
      `Today brings positive energy for ${zodiacSigns[sign].name}. Your ${zodiacSigns[sign].traits[0].toLowerCase()} nature will help you overcome any challenges.`,
      `The stars align in your favor today, ${zodiacSigns[sign].name}. Focus on your ${zodiacSigns[sign].traits[1].toLowerCase()} qualities to achieve your goals.`,
      `Your ${zodiacSigns[sign].ruler} influence is strong today. Trust your intuition and embrace new opportunities.`
    ],
    weekly: [
      `This week promises growth and development for ${zodiacSigns[sign].name}. Your ${zodiacSigns[sign].element} element brings creativity and passion.`,
      `The planetary alignment supports your ${zodiacSigns[sign].quality.toLowerCase()} nature this week. Take initiative and lead with confidence.`,
      `Relationships and communication will be highlighted this week. Your natural ${zodiacSigns[sign].traits[2].toLowerCase()} abilities will shine.`
    ],
    monthly: [
      `This month brings transformative energy for ${zodiacSigns[sign].name}. Embrace change and trust your ${zodiacSigns[sign].traits[3].toLowerCase()} instincts.`,
      `Your ${zodiacSigns[sign].ruler} ruler brings wisdom and guidance this month. Focus on personal development and spiritual growth.`,
      `The cosmic energy supports your ${zodiacSigns[sign].traits[4].toLowerCase()} nature. This is an excellent time for new beginnings and fresh starts.`
    ]
  };
  
  const randomIndex = Math.floor(Math.random() * templates[type].length);
  return templates[type][randomIndex];
}

// Get daily horoscope for a zodiac sign
router.get('/daily/:sign', 
  param('sign').isIn(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { sign } = req.params;
      const date = new Date();
      
      const horoscope = generateHoroscope(sign, 'daily');
      const signInfo = zodiacSigns[sign];
      
      res.json({
        success: true,
        data: {
          sign: sign,
          date: date.toISOString().split('T')[0],
          horoscope: horoscope,
          signInfo: signInfo,
          type: 'daily',
          luckyNumber: Math.floor(Math.random() * 12) + 1,
          luckyColor: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'][Math.floor(Math.random() * 6)]
        }
      });
    } catch (error) {
      console.error('Daily horoscope error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch daily horoscope',
        error: error.message 
      });
    }
  }
);

// Get weekly horoscope for a zodiac sign
router.get('/weekly/:sign',
  param('sign').isIn(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { sign } = req.params;
      const date = new Date();
      
      const horoscope = generateHoroscope(sign, 'weekly');
      const signInfo = zodiacSigns[sign];
      
      res.json({
        success: true,
        data: {
          sign: sign,
          weekStart: getWeekStart(date),
          weekEnd: getWeekEnd(date),
          horoscope: horoscope,
          signInfo: signInfo,
          type: 'weekly'
        }
      });
    } catch (error) {
      console.error('Weekly horoscope error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch weekly horoscope',
        error: error.message 
      });
    }
  }
);

// Get monthly horoscope for a zodiac sign
router.get('/monthly/:sign',
  param('sign').isIn(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { sign } = req.params;
      const date = new Date();
      
      const horoscope = generateHoroscope(sign, 'monthly');
      const signInfo = zodiacSigns[sign];
      
      res.json({
        success: true,
        data: {
          sign: sign,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          horoscope: horoscope,
          signInfo: signInfo,
          type: 'monthly'
        }
      });
    } catch (error) {
      console.error('Monthly horoscope error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch monthly horoscope',
        error: error.message 
      });
    }
  }
);

// Get all zodiac signs information
router.get('/signs', async (req, res) => {
  try {
    const signsInfo = Object.keys(zodiacSigns).map(sign => ({
      sign: sign,
      ...zodiacSigns[sign]
    }));
    
    res.json({
      success: true,
      data: signsInfo
    });
  } catch (error) {
    console.error('Signs info error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch zodiac signs information',
      error: error.message 
    });
  }
});

// Get horoscope based on birth date
router.post('/birth-date', 
  protect,
  [
    body('birthDate').isISO8601().withMessage('Valid birth date is required'),
    body('birthTime').optional().isString().withMessage('Birth time should be a string'),
    body('birthPlace').optional().isString().withMessage('Birth place should be a string')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { birthDate, birthTime, birthPlace } = req.body;
      const birthDateTime = new Date(birthDate);
      
      // Get zodiac sign from birth date
      const sign = getZodiacSign(birthDateTime);
      
      // Get daily horoscope for the calculated sign
      const horoscope = generateHoroscope(sign, 'daily');
      
      // Get detailed sign information
      const signInfo = zodiacSigns[sign];
      
      res.json({
        success: true,
        data: {
          birthDate: birthDate,
          birthTime: birthTime,
          birthPlace: birthPlace,
          zodiacSign: sign,
          horoscope: horoscope,
          signInfo: signInfo
        }
      });
    } catch (error) {
      console.error('Birth date horoscope error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to calculate horoscope from birth date',
        error: error.message 
      });
    }
  }
);

// Helper functions
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

function getWeekEnd(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

export default router;
