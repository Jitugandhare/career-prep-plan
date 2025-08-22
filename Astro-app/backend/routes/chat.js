import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// In-memory storage for chat messages (in production, use Redis or database)
const chatRooms = new Map();
const onlineUsers = new Map();

// @desc    Get chat history
// @route   GET /api/chat/:roomId
// @access  Private
router.get('/:roomId', protect, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const room = chatRooms.get(roomId);
    if (!room) {
      return res.json({
        success: true,
        data: {
          messages: [],
          pagination: {
            page: 1,
            limit: parseInt(limit),
            total: 0,
            pages: 0
          }
        }
      });
    }

    const messages = room.messages || [];
    const total = messages.length;
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedMessages = messages.slice(skip, skip + parseInt(limit));

    res.json({
      success: true,
      data: {
        messages: paginatedMessages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages
        }
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history'
    });
  }
});

// @desc    Send message
// @route   POST /api/chat/:roomId/message
// @access  Private
router.post('/:roomId/message', protect, [
  body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Message must be between 1 and 1000 characters'),
  body('type').optional().isIn(['text', 'image', 'file']).withMessage('Invalid message type')
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

    const { roomId } = req.params;
    const { content, type = 'text', metadata } = req.body;

    const message = {
      id: Date.now().toString(),
      sender: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
        profileImage: req.user.profileImage
      },
      content,
      type,
      metadata,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Get or create chat room
    if (!chatRooms.has(roomId)) {
      chatRooms.set(roomId, {
        id: roomId,
        participants: [],
        messages: [],
        createdAt: new Date().toISOString()
      });
    }

    const room = chatRooms.get(roomId);
    room.messages.push(message);

    // Keep only last 1000 messages to prevent memory issues
    if (room.messages.length > 1000) {
      room.messages = room.messages.slice(-1000);
    }

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: { message }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// @desc    Mark messages as read
// @route   PUT /api/chat/:roomId/read
// @access  Private
router.put('/:roomId/read', protect, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { messageIds } = req.body;

    const room = chatRooms.get(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Chat room not found'
      });
    }

    if (messageIds && Array.isArray(messageIds)) {
      // Mark specific messages as read
      room.messages.forEach(message => {
        if (messageIds.includes(message.id) && message.sender.id !== req.user.id) {
          message.read = true;
        }
      });
    } else {
      // Mark all unread messages as read
      room.messages.forEach(message => {
        if (!message.read && message.sender.id !== req.user.id) {
          message.read = true;
        }
      });
    }

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error('Mark messages read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark messages as read'
    });
  }
});

// @desc    Get unread message count
// @route   GET /api/chat/unread-count
// @access  Private
router.get('/unread-count', protect, async (req, res) => {
  try {
    const unreadCounts = {};

    for (const [roomId, room] of chatRooms.entries()) {
      const unreadCount = room.messages.filter(
        message => !message.read && message.sender.id !== req.user.id
      ).length;
      
      if (unreadCount > 0) {
        unreadCounts[roomId] = unreadCount;
      }
    }

    res.json({
      success: true,
      data: { unreadCounts }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count'
    });
  }
});

// @desc    Get chat rooms for user
// @route   GET /api/chat/rooms
// @access  Private
router.get('/rooms', protect, async (req, res) => {
  try {
    const userRooms = [];

    for (const [roomId, room] of chatRooms.entries()) {
      // Check if user is participant in this room
      if (room.participants.includes(req.user.id)) {
        const lastMessage = room.messages[room.messages.length - 1];
        const unreadCount = room.messages.filter(
          message => !message.read && message.sender.id !== req.user.id
        ).length;

        userRooms.push({
          roomId,
          lastMessage,
          unreadCount,
          updatedAt: lastMessage ? lastMessage.timestamp : room.createdAt
        });
      }
    }

    // Sort by last message time
    userRooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json({
      success: true,
      data: { rooms: userRooms }
    });
  } catch (error) {
    console.error('Get chat rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat rooms'
    });
  }
});

// @desc    Create or join chat room
// @route   POST /api/chat/rooms
// @access  Private
router.post('/rooms', protect, [
  body('participants').isArray({ min: 1 }).withMessage('At least one participant is required'),
  body('type').optional().isIn(['direct', 'group']).withMessage('Invalid room type')
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

    const { participants, type = 'direct', name } = req.body;

    // Add current user to participants if not already included
    if (!participants.includes(req.user.id)) {
      participants.push(req.user.id);
    }

    // For direct messages, create a unique room ID
    let roomId;
    if (type === 'direct' && participants.length === 2) {
      roomId = participants.sort().join('_');
    } else {
      roomId = `group_${Date.now()}`;
    }

    // Check if room already exists
    if (chatRooms.has(roomId)) {
      const existingRoom = chatRooms.get(roomId);
      return res.json({
        success: true,
        data: { roomId, room: existingRoom }
      });
    }

    // Create new room
    const newRoom = {
      id: roomId,
      type,
      name: name || `Chat Room ${roomId}`,
      participants,
      messages: [],
      createdAt: new Date().toISOString()
    };

    chatRooms.set(roomId, newRoom);

    res.status(201).json({
      success: true,
      message: 'Chat room created successfully',
      data: { roomId, room: newRoom }
    });
  } catch (error) {
    console.error('Create chat room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create chat room'
    });
  }
});

// @desc    Update user online status
// @route   PUT /api/chat/online-status
// @access  Private
router.put('/online-status', protect, [
  body('isOnline').isBoolean().withMessage('isOnline must be a boolean')
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

    const { isOnline } = req.body;

    if (isOnline) {
      onlineUsers.set(req.user.id, {
        userId: req.user.id,
        name: req.user.name,
        lastSeen: new Date().toISOString()
      });
    } else {
      onlineUsers.delete(req.user.id);
    }

    res.json({
      success: true,
      message: 'Online status updated'
    });
  } catch (error) {
    console.error('Update online status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update online status'
    });
  }
});

// @desc    Get online users
// @route   GET /api/chat/online-users
// @access  Private
router.get('/online-users', protect, async (req, res) => {
  try {
    const onlineUsersList = Array.from(onlineUsers.values());

    res.json({
      success: true,
      data: { onlineUsers: onlineUsersList }
    });
  } catch (error) {
    console.error('Get online users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get online users'
    });
  }
});

export default router;
