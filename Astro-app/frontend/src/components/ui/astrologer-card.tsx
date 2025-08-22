import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import Chat from "./chat";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface AstrologerCardProps {
  id: string;
  name: string;
  experience: number;
  rating: number;
  specialties: string[];
  isOnline: boolean;
  profileImage: string;
  callRate: number;
  chatRate: number;
}

export const AstrologerCard = ({
  id,
  name,
  experience,
  rating,
  specialties,
  isOnline,
  profileImage,
  callRate,
  chatRate,
}: AstrologerCardProps) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <div className="relative">
              <img
                src={profileImage}
                alt={name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {isOnline && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{name}</h3>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{rating}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{experience} years</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{specialties.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {isOnline ? (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="bg-astro-pink hover:bg-astro-pink/90 text-astro-pink-foreground"
                  size="sm"
                  onClick={() => setShowChat(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-astro-pink text-astro-pink hover:bg-astro-pink-muted"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  ₹{callRate}/min
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-astro-pink text-astro-pink hover:bg-astro-pink-muted"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  ₹{callRate}/min
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-astro-pink text-astro-pink hover:bg-astro-pink-muted"
                  onClick={() => setShowChat(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  ₹{chatRate}/min
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Dialog */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chat with {name}</DialogTitle>
          </DialogHeader>
          <Chat
            astrologerId={id}
            astrologerName={name}
            astrologerImage={profileImage}
            isOnline={isOnline}
            onClose={() => setShowChat(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
