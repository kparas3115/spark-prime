import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { SecurityDashboard } from '@/components/SecurityDashboard';
import { PasswordVault } from '@/components/PasswordVault';
import { PasswordGenerator } from '@/components/PasswordGenerator';
import { TOTPGenerator } from '@/components/TOTPGenerator';
import { SecurityAnalysis } from '@/components/SecurityAnalysis';
import { BreachCheck } from '@/components/BreachCheck';
import { SecurityCoach } from '@/components/SecurityCoach';
import { Achievements } from '@/components/Achievements';
import { ActivityStats } from '@/components/ActivityStats';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SecurityDashboard />;
      case 'vault':
        return <PasswordVault />;
      case 'generator':
        return <PasswordGenerator />;
      case 'analysis':
        return <SecurityAnalysis />;
      case 'breach':
        return <BreachCheck />;
      case 'coach':
        return <SecurityCoach />;
      case 'achievements':
        return <Achievements />;
      case 'stats':
        return <ActivityStats />;
      default:
        return <SecurityDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-cyber"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-cyber" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Index;
