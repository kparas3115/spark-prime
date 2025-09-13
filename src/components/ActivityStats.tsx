import { TrendingUp, Activity, Clock, Calendar, BarChart3, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockActivities, mockUserStats } from '@/lib/mock-data';

export const ActivityStats = () => {
  // Mock activity data for charts
  const weeklyData = [
    { day: 'Mon', logins: 3, actions: 8 },
    { day: 'Tue', logins: 2, actions: 5 },
    { day: 'Wed', logins: 4, actions: 12 },
    { day: 'Thu', logins: 1, actions: 3 },
    { day: 'Fri', logins: 5, actions: 15 },
    { day: 'Sat', logins: 2, actions: 6 },
    { day: 'Sun', logins: 1, actions: 2 }
  ];

  const monthlyTrend = [
    { month: 'Jan', score: 45, activity: 20 },
    { month: 'Feb', score: 52, activity: 35 },
    { month: 'Mar', score: 58, activity: 42 },
    { month: 'Apr', score: 64, activity: 38 },
    { month: 'May', score: 68, activity: 51 }
  ];

  const getActivityTypeStats = () => {
    const typeCount = mockActivities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCount).map(([type, count]) => ({
      type: type.replace('_', ' ').toUpperCase(),
      count
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-primary animate-pulse-cyber" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Activity Stats
          </h1>
          <p className="text-muted-foreground">Comprehensive analytics of your security activities</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{mockUserStats.totalLogins}</div>
            <p className="text-xs text-muted-foreground">Total Logins</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">{mockUserStats.loginStreak}</div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{mockUserStats.passwordsCreated}</div>
            <p className="text-xs text-muted-foreground">Passwords Created</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{mockUserStats.securityPoints}</div>
            <p className="text-xs text-muted-foreground">Security Points</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">{mockActivities.length}</div>
            <p className="text-xs text-muted-foreground">Recent Actions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{mockUserStats.breachesAvoided}</div>
            <p className="text-xs text-muted-foreground">Breaches Avoided</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Weekly Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="logins" fill="hsl(var(--primary))" name="Logins" />
              <Bar dataKey="actions" fill="hsl(var(--accent))" name="Actions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Security Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Security Score"
              />
              <Line 
                type="monotone" 
                dataKey="activity" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                name="Activity Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-warning" />
              Activity Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getActivityTypeStats().map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <span className="font-medium capitalize">{stat.type}</span>
                  <Badge variant="outline">{stat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Zap className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-accent">7-Day Login Streak</p>
                  <p className="text-sm text-muted-foreground">Excellent consistency!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-primary">Security Score: 68%</p>
                  <p className="text-sm text-muted-foreground">+5 points this week</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <BarChart3 className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-warning">Password Vault Active</p>
                  <p className="text-sm text-muted-foreground">4 passwords managed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};