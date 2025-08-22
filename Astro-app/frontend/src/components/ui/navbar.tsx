import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  walletBalance?: number;
}

export const Navbar = ({ walletBalance = 1250 }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-astro-pink bg-clip-text text-transparent">
            AstroApp
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {user && (
            <Link to="/chat">
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle size={20} />
              </Button>
            </Link>
          )}
          <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-full">
            <Wallet size={16} className="text-astro-pink" />
            <span className="text-sm font-semibold">₹{walletBalance}</span>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="w-full">
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link to="/astrologers" className="w-full">
              <Button variant="ghost" className="w-full justify-start">Astrologers</Button>
            </Link>
            <Link to="/horoscope" className="w-full">
              <Button variant="ghost" className="w-full justify-start">Horoscope</Button>
            </Link>
            <Link to="/kundali" className="w-full">
              <Button variant="ghost" className="w-full justify-start">Kundali</Button>
            </Link>
            <Link to="/mall" className="w-full">
              <Button variant="ghost" className="w-full justify-start">Mall</Button>
            </Link>
            {user && (
              <Link to="/chat" className="w-full">
                <Button variant="ghost" className="w-full justify-start">Messages</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};