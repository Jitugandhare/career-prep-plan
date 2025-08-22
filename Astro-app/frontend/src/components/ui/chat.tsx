import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { chatAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    role: string;
    profileImage?: string;
  };
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  read: boolean;
  metadata?: any;
}

interface ChatRoom {
  roomId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

interface ChatProps {
  astrologerId?: string;
  astrologerName?: string;
  astrologerImage?: string;
  isOnline?: boolean;
  onClose?: () => void;
}

const Chat: React.FC<ChatProps> = ({
  astrologerId,
  astrologerName = 'Astrologer',
  astrologerImage,
  isOnline = false,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const roomId = astrologerId ? `${user?.id}_${astrologerId}` : '';

  useEffect(() => {
    if (!roomId || !user) return;

    // Initialize Socket.IO connection
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Join chat room
    newSocket.emit('join-room', roomId);

    // Load chat history
    loadChatHistory();

    // Set user as online
    chatAPI.updateOnlineStatus(true);

    return () => {
      newSocket.emit('leave-room', roomId);
      newSocket.disconnect();
      chatAPI.updateOnlineStatus(false);
    };
  }, [roomId, user]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    // Listen for typing indicators
    socket.on('user-typing', (data: { userId: string; userName: string }) => {
      if (data.userId !== user?.id) {
        setTypingUsers(prev => [...prev.filter(id => id !== data.userId), data.userId]);
      }
    });

    socket.on('user-stop-typing', (data: { userId: string }) => {
      setTypingUsers(prev => prev.filter(id => id !== data.userId));
    });

    return () => {
      socket.off('new-message');
      socket.off('user-typing');
      socket.off('user-stop-typing');
    };
  }, [socket, user]);

  const loadChatHistory = async () => {
    if (!roomId) return;

    try {
      setIsLoading(true);
      const response = await chatAPI.getHistory(roomId);
      const chatData = response.data;
      setMessages(chatData.messages || []);
      scrollToBottom();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socket || !roomId) return;

    try {
      const messageData = {
        content: newMessage.trim(),
        type: 'text' as const
      };

      // Send message via API
      const response = await chatAPI.sendMessage(roomId, messageData);
      const message = response.data.message;

      // Add message to local state
      setMessages(prev => [...prev, message]);

      // Emit message via socket
      socket.emit('send-message', {
        roomId,
        message
      });

      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleTyping = () => {
    if (!socket || !roomId) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', {
        roomId,
        userId: user?.id,
        userName: user?.name
      });
    }

    // Clear typing indicator after 2 seconds
    setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        socket.emit('stop-typing', {
          roomId,
          userId: user?.id
        });
      }
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isOwnMessage = (message: Message) => {
    return message.sender.id === user?.id;
  };

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={astrologerImage} />
              <AvatarFallback>{astrologerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{astrologerName}</CardTitle>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-muted-foreground">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-muted-foreground mb-2">No messages yet</div>
                <div className="text-sm text-muted-foreground">
                  Start a conversation with {astrologerName}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage(message) ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[80%] ${isOwnMessage(message) ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!isOwnMessage(message) && (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={message.sender.profileImage} />
                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-3 py-2 ${
                      isOwnMessage(message)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        isOwnMessage(message) ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                        {isOwnMessage(message) && (
                          <span className="ml-2">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {typingUsers.length > 0 && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="text-sm text-muted-foreground">typing...</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <Separator />

        {/* Message Input */}
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
