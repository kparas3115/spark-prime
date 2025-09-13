import { Shield, AlertTriangle, TrendingUp, Eye, Lock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SecurityMetrics } from '@/types';
import { mockSecurityMetrics } from '@/lib/mock-data';

interface SecurityDashboardProps {
  metrics?: SecurityMetrics;
}

export const SecurityDashboard = ({ metrics = mockSecurityMetrics }: SecurityDashboardProps) => {
  const getSecurityLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-accent', bg: 'bg-accent/20' };
    if (score >= 75) return { level: 'Good', color: 'text-primary', bg: 'bg-primary/20' };
    if (score >= 50) return { level: 'Fair', color: 'text-warning', bg: 'bg-warning/20' };
    return { level: 'Poor', color: 'text-destructive', bg: 'bg-destructive/20' };
  };

  const security = getSecurityLevel(metrics.securityScore);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Security Score */}
      <Card className="glass-card border-primary/30">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Shield className="h-8 w-8 text-primary animate-pulse-cyber" />
            Security Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="text-6xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              {metrics.securityScore}
            </div>
            <div className="absolute -right-8 top-2">
              <Badge className={`${security.bg} ${security.color} border-current`}>
                {security.level}
              </Badge>
            </div>
          </div>
          <Progress 
            value={metrics.securityScore} 
            className="mt-4 h-3"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {metrics.totalPasswords} passwords analyzed
          </p>
        </CardContent>
      </Card>

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Strong Passwords</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {metrics.strongPasswords}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.strongPasswords / metrics.totalPasswords) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-danger transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weak Passwords</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {metrics.weakPasswords}
            </div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-danger transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compromised</CardTitle>
            <Eye className="h-4 w-4 text-destructive animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {metrics.compromisedPasswords}
            </div>
            <p className="text-xs text-muted-foreground">
              Found in data breaches
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Strength</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics.averageStrength.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 100 points
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reused Passwords</CardTitle>
            <Lock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {metrics.reusedPasswords}
            </div>
            <p className="text-xs text-muted-foreground">
              Duplicate passwords found
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-cyber transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-accent">
              {metrics.lastBreachCheck.toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Breach database check
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Tips */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Zap className="h-5 w-5" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.compromisedPasswords > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">Critical: Update compromised passwords</p>
                  <p className="text-sm text-muted-foreground">
                    {metrics.compromisedPasswords} password(s) found in known data breaches
                  </p>
                </div>
              </div>
            )}
            
            {metrics.weakPasswords > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                <Lock className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-warning">Strengthen weak passwords</p>
                  <p className="text-sm text-muted-foreground">
                    Use longer passwords with mixed characters
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
              <TrendingUp className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-accent">Enable 2FA everywhere possible</p>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds an extra security layer
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};