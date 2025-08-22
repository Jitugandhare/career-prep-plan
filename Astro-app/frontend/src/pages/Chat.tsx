import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, MessageCircle, Phone, Video, MoreVertical, Send } from "lucide-react";
import { chatAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const ChatPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch chat rooms
  const { data: chatRoomsData, isLoading, error } = useQuery({
    queryKey: ['chat-rooms'],
    queryFn: () => chatAPI.getRooms(),
    staleTime: 30 * 1000, // 30 seconds
  });

  const chatRooms = chatRoomsData?.data?.rooms || [];

  // Filter chat rooms based on search
  const filteredRooms = chatRooms.filter((room: ChatRoom) => {
    if (!room.lastMessage) return false;
    return room.lastMessage.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           room.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room);
    setShowChatDialog(true);
  };

  const handleCloseChat = () => {
    setShowChatDialog(false);
    setSelectedRoom(null);
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load chat rooms",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading conversations...</div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground mb-4">
              Start chatting with astrologers to see your conversations here.
            </p>
            <Button onClick={() => window.location.href = '/astrologers'}>
              Find Astrologers
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRooms.map((room: ChatRoom) => (
              <Card 
                key={room.roomId} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRoomSelect(room)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={room.lastMessage?.sender.profileImage} />
                      <AvatarFallback>
                        {room.lastMessage?.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">
                          {room.lastMessage?.sender.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {room.lastMessage && formatTime(room.lastMessage.timestamp)}
                          </span>
                          {room.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {room.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {room.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Chat Dialog */}
      {selectedRoom && (
        <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                Chat with {selectedRoom.lastMessage?.sender.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1">
              {/* This would render the Chat component */}
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Chat component would be rendered here
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ChatPage;
