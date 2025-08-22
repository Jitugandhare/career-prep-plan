import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stars, Phone, MessageCircle, Heart, Star, Calendar, ShoppingBag, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredAstrologers = [
    {
      name: "Pandit Rajesh Kumar",
      experience: 15,
      rating: 4.8,
      isOnline: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Shanti Devi",
      experience: 22,
      rating: 4.9,
      isOnline: false,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="px-4 py-8 bg-gradient-to-br from-background via-astro-pink-muted/5 to-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-astro-pink rounded-full flex items-center justify-center">
            <Stars className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-astro-pink bg-clip-text text-transparent">
              AstroApp
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Connect with expert astrologers, discover your destiny, and unlock the mysteries of the cosmos
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Link to="/astrologers">
              <Button size="lg" variant="outline" className="border-astro-pink text-astro-pink hover:bg-astro-pink-muted">
                Explore Astrologers
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Services</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/astrologers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 mx-auto mb-2 text-astro-pink" />
                <h3 className="font-semibold">Call Astrologer</h3>
                <p className="text-sm text-muted-foreground">Instant consultation</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/astrologers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-astro-pink" />
                <h3 className="font-semibold">Chat</h3>
                <p className="text-sm text-muted-foreground">Live messaging</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/horoscope">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-astro-pink" />
                <h3 className="font-semibold">Horoscope</h3>
                <p className="text-sm text-muted-foreground">Daily predictions</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/kundali">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-astro-pink" />
                <h3 className="font-semibold">Kundali</h3>
                <p className="text-sm text-muted-foreground">Birth chart analysis</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      
      {/* Featured Astrologers */}
      <div className="px-4 py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Astrologers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredAstrologers.map((astrologer, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <div className="relative">
                      <img
                        src={astrologer.image}
                        alt={astrologer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {astrologer.isOnline && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{astrologer.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{astrologer.rating}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{astrologer.experience} years</span>
                      </div>
                      
                      <div className="mt-3">
                        {astrologer.isOnline ? (
                          <Button size="sm" className="bg-astro-pink hover:bg-astro-pink/90 text-astro-pink-foreground">
                            Connect Now
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-astro-pink text-astro-pink hover:bg-astro-pink-muted"
                          >
                            View Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/astrologers">
              <Button variant="outline">View All Astrologers</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Astro Mall CTA */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-primary/10 to-astro-pink/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-astro-pink" />
            <h3 className="text-xl font-bold mb-2">Astro Mall</h3>
            <p className="text-muted-foreground mb-4">
              Discover authentic gemstone bracelets and spiritual accessories
            </p>
            <Link to="/mall">
              <Button className="bg-astro-pink hover:bg-astro-pink/90 text-astro-pink-foreground">
                Shop Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;