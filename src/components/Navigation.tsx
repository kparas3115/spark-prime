import { useState } from 'react';
import { Shield, Home, Lock, Zap, Smartphone, Settings, Menu, X, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'vault', label: 'Vault', icon: Lock, badge: '6' },
    { id: 'generator', label: 'Generator', icon: Zap, badge: null },
    { id: 'totp', label: 'Authenticator', icon: Smartphone, badge: '3' },
  ];

  const NavItem = ({ item, isMobile = false }) => (
    <button
      onClick={() => {
        setActiveTab(item.id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full text-left
        ${activeTab === item.id 
          ? 'bg-primary text-primary-foreground shadow-cyber' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
        }
      `}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
      {item.badge && (
        <Badge variant="outline" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </button>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary animate-pulse-cyber" />
              <div className="absolute inset-0 h-8 w-8 text-primary animate-pulse opacity-50"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                FORTIPASS
              </h1>
              <p className="text-xs text-muted-foreground">Student Security Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Made for FOSS Club</span>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                <Star className="h-3 w-3" />
              </div>
            </div>
            <div className="text-xs text-primary mt-1">
              Secure • Open Source • Student-First
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold bg-gradient-cyber bg-clip-text text-transparent">
              FORTIPASS
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9 p-0"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border lg:hidden">
            <nav className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} isMobile={true} />
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};