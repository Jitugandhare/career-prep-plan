import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Star, Heart, Loader2 } from "lucide-react";
import { productsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Mall = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const { toast } = useToast();

  // Fetch products using React Query
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => productsAPI.getAll({ search: searchQuery }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const products = productsData?.data?.products || [];

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart.",
    });
  };

  const discount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Astro Mall</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading products...</span>
          </div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.images?.[0] || "https://via.placeholder.com/300x200?text=Product"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.originalPrice && product.price && (
                    <Badge className="absolute top-2 left-2 bg-green-600">
                      {discount(product.originalPrice, product.price)}% OFF
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => addToCart(product._id)}
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mall;