import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/ui/navbar";
import { AstrologerCard } from "@/components/ui/astrologer-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2 } from "lucide-react";
import { astrologersAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Astrologers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch astrologers using React Query
  const { data: astrologersData, isLoading, error } = useQuery({
    queryKey: ['astrologers', searchQuery],
    queryFn: () => astrologersAPI.getAll({ search: searchQuery }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const astrologers = astrologersData?.data?.astrologers || [];

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load astrologers. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Our Astrologers</h1>
          
          <div className="flex space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search astrologers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading astrologers...</span>
          </div>
        ) : !Array.isArray(astrologers) || astrologers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No astrologers found.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {astrologers.map((astrologer) => (
              <AstrologerCard key={astrologer._id} {...astrologer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Astrologers;