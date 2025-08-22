import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const {
      search,
      category,
      subcategory,
      minPrice,
      maxPrice,
      minRating,
      isFeatured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    let products = await Product.find(filter)
      .populate('seller', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    // If no products found, return sample data for testing
    if (products.length === 0) {
      products = [
        {
          _id: '1',
          name: 'Rudraksha Bracelet',
          description: 'Authentic 5 Mukhi Rudraksha bracelet for peace and prosperity',
          price: 1299,
          originalPrice: 1999,
          category: 'Spiritual',
          subcategory: 'Bracelets',
          images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop'],
          rating: 4.8,
          reviews: [],
          stock: 50,
          isActive: true,
          isFeatured: true,
          seller: { _id: '1', name: 'Astro Store' },
          specifications: {
            material: 'Rudraksha',
            size: 'Adjustable',
            mukhi: '5 Mukhi'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '2',
          name: 'Red Coral Bracelet',
          description: 'Natural red coral for Mars energy and confidence',
          price: 2499,
          originalPrice: 3499,
          category: 'Gemstone',
          subcategory: 'Bracelets',
          images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop'],
          rating: 4.6,
          reviews: [],
          stock: 30,
          isActive: true,
          isFeatured: true,
          seller: { _id: '1', name: 'Astro Store' },
          specifications: {
            material: 'Red Coral',
            size: 'Adjustable',
            weight: '5g'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '3',
          name: 'Tiger Eye Bracelet',
          description: 'Golden tiger eye for protection and courage',
          price: 899,
          originalPrice: 1299,
          category: 'Gemstone',
          subcategory: 'Bracelets',
          images: ['https://images.unsplash.com/photo-1506629905687-404b5fc88ad2?w=300&h=300&fit=crop'],
          rating: 4.7,
          reviews: [],
          stock: 75,
          isActive: true,
          isFeatured: false,
          seller: { _id: '1', name: 'Astro Store' },
          specifications: {
            material: 'Tiger Eye',
            size: 'Adjustable',
            weight: '3g'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '4',
          name: 'Crystal Quartz Bracelet',
          description: 'Clear quartz crystal for clarity and amplification',
          price: 1599,
          originalPrice: 2299,
          category: 'Crystal',
          subcategory: 'Bracelets',
          images: ['https://images.unsplash.com/photo-1583766395091-850e0d7e7622?w=300&h=300&fit=crop'],
          rating: 4.9,
          reviews: [],
          stock: 40,
          isActive: true,
          isFeatured: true,
          seller: { _id: '1', name: 'Astro Store' },
          specifications: {
            material: 'Clear Quartz',
            size: 'Adjustable',
            weight: '4g'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name')
      .populate('reviews.user', 'name profileImage');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin or Seller)
router.post('/', protect, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
  body('description').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['Spiritual', 'Gemstone', 'Crystal', 'Protection', 'Love', 'Career', 'Health', 'Wealth', 'Meditation', 'Feng Shui']).withMessage('Invalid category'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      images,
      stock,
      tags,
      specifications,
      benefits,
      usageInstructions,
      warranty,
      shipping
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      images,
      stock,
      tags,
      specifications,
      benefits,
      usageInstructions,
      warranty,
      shipping,
      seller: req.user.id
    });

    const populatedProduct = await Product.findById(product._id)
      .populate('seller', 'name');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product: populatedProduct }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin or Seller)
router.put('/:id', protect, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
  body('description').optional().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is authorized to update this product
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const updateFields = req.body;
    Object.keys(updateFields).forEach(key => {
      product[key] = updateFields[key];
    });

    await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate('seller', 'name');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product: updatedProduct }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin or Seller)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is authorized to delete this product
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { rating, comment } = req.body;

    // Check if user has already reviewed this product
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Add review
    product.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    // Update rating statistics
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.totalRatings = product.reviews.length;
    product.rating = totalRating;

    await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate('seller', 'name')
      .populate('reviews.user', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: { product: updatedProduct }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const subcategories = await Product.distinct('subcategory');

    res.json({
      success: true,
      data: {
        categories,
        subcategories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isActive: true, 
      isFeatured: true 
    })
      .populate('seller', 'name')
      .sort({ rating: -1, totalRatings: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
