import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, Star, Calendar } from "lucide-react";

const Kundali = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    gender: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateKundali = () => {
    console.log("Generating Kundali:", formData);
    // Handle Kundali generation logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Kundali Services</h1>
        
        <div className="grid grid-cols-2 mb-6">
          <Button
            variant={activeTab === "generate" ? "default" : "outline"}
            onClick={() => setActiveTab("generate")}
            className="rounded-r-none"
          >
            Generate Kundali
          </Button>
          <Button
            variant={activeTab === "matching" ? "default" : "outline"}
            onClick={() => setActiveTab("matching")}
            className="rounded-l-none"
          >
            Kundali Matching
          </Button>
        </div>
        
        {activeTab === "generate" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-astro-pink" />
                <span>Generate Your Kundali</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthTime">Time of Birth</Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => handleInputChange("birthTime", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="birthPlace">Place of Birth</Label>
                  <Input
                    id="birthPlace"
                    placeholder="Enter city, state/province, country"
                    value={formData.birthPlace}
                    onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateKundali}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Generate Kundali - ₹299
              </Button>
            </CardContent>
          </Card>
        )}
        
        {activeTab === "matching" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-astro-pink" />
                  <span>Kundali Matching</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Boy's Details</span>
                    </h3>
                    <div className="space-y-3">
                      <Input placeholder="Boy's name" />
                      <Input type="date" />
                      <Input type="time" />
                      <Input placeholder="Place of birth" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Girl's Details</span>
                    </h3>
                    <div className="space-y-3">
                      <Input placeholder="Girl's name" />
                      <Input type="date" />
                      <Input type="time" />
                      <Input placeholder="Place of birth" />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-astro-pink hover:bg-astro-pink/90 text-astro-pink-foreground">
                  Check Compatibility - ₹499
                </Button>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-astro-pink mb-2">36</div>
                  <div className="text-sm text-muted-foreground">Total Gunas</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">18+</div>
                  <div className="text-sm text-muted-foreground">Good Match</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">24+</div>
                  <div className="text-sm text-muted-foreground">Excellent Match</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kundali;