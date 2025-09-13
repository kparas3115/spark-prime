import { Shield, AlertTriangle, TrendingUp, Eye, Lock, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SecurityMetrics } from '@/types';
import { mockSecurityMetrics, mockUserStats, mockActivities, mockSecurityInsights } from '@/lib/mock-data';
import { RecentActivity } from './RecentActivity';
import { SecurityInsights } from './SecurityInsights';

interface SecurityDashboardProps {
  metrics?: SecurityMetrics;
}

export const SecurityDashboard = ({ metrics = mockSecurityMetrics }: SecurityDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Status and Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full border border-accent/30">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accent">Status: Authenticated</span>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent leading-tight">
            FORTIPass: F O S S - O R I E N T E D  R E L I A B L E  T O O L
          </h1>
          <h2 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            F O R  I N T E L L I G E N C E  I N  P A S S W O R D  S E C U R I T Y
          </h2>
        </div>
      </div>

      {/* Dashboard Header */}
      <Card className="glass-card bg-primary/10 border-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <span className="text-primary">Security Dashboard</span>
              <p className="text-sm text-muted-foreground font-normal">Your security overview at a glance</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Stored Passwords</CardTitle>
            <Lock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {metrics.totalPasswords}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {metrics.securityScore}% 
              <span className="text-lg text-muted-foreground ml-1">(C)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Security Points</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">
              {mockUserStats.securityPoints}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {mockUserStats.badgesEarned}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={mockActivities} />
        <SecurityInsights insights={mockSecurityInsights} />
      </div>

      {/* Security Recommendations Summary */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Update weak passwords</p>
                <p className="text-xs text-muted-foreground">1 password needs attention</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-primary">Run security scan</p>
                <p className="text-xs text-muted-foreground">Check for breaches</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
              <CheckCircle className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-accent">Enable 2FA</p>
                <p className="text-xs text-muted-foreground">Add extra security layer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};