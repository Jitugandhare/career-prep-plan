import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState("aries");

  const zodiacSigns = [
    { id: "aries", name: "Aries", dates: "Mar 21 - Apr 19", emoji: "♈" },
    { id: "taurus", name: "Taurus", dates: "Apr 20 - May 20", emoji: "♉" },
    { id: "gemini", name: "Gemini", dates: "May 21 - Jun 20", emoji: "♊" },
    { id: "cancer", name: "Cancer", dates: "Jun 21 - Jul 22", emoji: "♋" },
    { id: "leo", name: "Leo", dates: "Jul 23 - Aug 22", emoji: "♌" },
    { id: "virgo", name: "Virgo", dates: "Aug 23 - Sep 22", emoji: "♍" },
    { id: "libra", name: "Libra", dates: "Sep 23 - Oct 22", emoji: "♎" },
    { id: "scorpio", name: "Scorpio", dates: "Oct 23 - Nov 21", emoji: "♏" },
    { id: "sagittarius", name: "Sagittarius", dates: "Nov 22 - Dec 21", emoji: "♐" },
    { id: "capricorn", name: "Capricorn", dates: "Dec 22 - Jan 19", emoji: "♑" },
    { id: "aquarius", name: "Aquarius", dates: "Jan 20 - Feb 18", emoji: "♒" },
    { id: "pisces", name: "Pisces", dates: "Feb 19 - Mar 20", emoji: "♓" },
  ];

  const horoscopeData = {
    aries: {
      today: "Today brings exciting opportunities for new beginnings. Your natural leadership qualities will shine, and others will look to you for guidance. A chance encounter could lead to something meaningful.",
      love: "Romance is in the air! Single Aries may meet someone special, while those in relationships will experience deeper connection.",
      career: "Your innovative ideas will be well-received at work. It's a great time to propose new projects or seek advancement.",
      health: "Energy levels are high, but remember to balance activity with rest. Consider trying a new fitness routine.",
      lucky: { number: 7, color: "Red", time: "2:00 PM - 4:00 PM" },
    },
  };

  const currentSign = zodiacSigns.find(sign => sign.id === selectedSign);
  const currentHoroscope = horoscopeData[selectedSign as keyof typeof horoscopeData] || horoscopeData.aries;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Daily Horoscope</h1>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
          {zodiacSigns.map((sign) => (
            <Button
              key={sign.id}
              variant={selectedSign === sign.id ? "default" : "outline"}
              onClick={() => setSelectedSign(sign.id)}
              className="flex flex-col h-auto py-3 text-xs"
            >
              <span className="text-lg mb-1">{sign.emoji}</span>
              <span className="font-medium">{sign.name}</span>
            </Button>
          ))}
        </div>
        
        {currentSign && (
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                <span className="text-3xl">{currentSign.emoji}</span>
                <div>
                  <div>{currentSign.name}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {currentSign.dates}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        )}
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentHoroscope.today}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Love & Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentHoroscope.love}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Career & Finance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentHoroscope.career}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health & Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentHoroscope.health}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Lucky Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Lucky Number:</span>
                <Badge variant="secondary">{currentHoroscope.lucky.number}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Lucky Color:</span>
                <Badge variant="secondary">{currentHoroscope.lucky.color}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Best Time:</span>
                <Badge variant="secondary">{currentHoroscope.lucky.time}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Horoscope;