import { BarChart3, TrendingUp, TrendingDown, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockSecurityMetrics, mockPasswords } from '@/lib/mock-data';

export const SecurityAnalysis = () => {
  // Mock trend data
  const trendData = [
    { name: 'Jan', score: 45 },
    { name: 'Feb', score: 52 },
    { name: 'Mar', score: 58 },
    { name: 'Apr', score: 64 },
    { name: 'May', score: 68 }
  ];

  const strengthData = [
    { name: 'Strong', value: mockSecurityMetrics.strongPasswords, color: '#10b981' },
    { name: 'Weak', value: mockSecurityMetrics.weakPasswords, color: '#f59e0b' },
    { name: 'Compromised', value: mockSecurityMetrics.compromisedPasswords, color: '#ef4444' }
  ];

  const categoryBreakdown = mockPasswords.reduce((acc, password) => {
    acc[password.category] = (acc[password.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-8 w-8 text-primary animate-pulse-cyber" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Security Analysis
          </h1>
          <p className="text-muted-foreground">Deep dive into your password security metrics</p>
        </div>
      </div>

      {/* Security Trend Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Security Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
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
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-2 mt-4">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              +23 points improvement this month
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Password Strength Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Password Strength Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={strengthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {strengthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {strengthData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryBreakdown).map(([category, count]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                  <Progress 
                    value={(count / mockSecurityMetrics.totalPasswords) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <CheckCircle className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Enable Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to all your important accounts
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning">Update Weak Passwords</p>
                <p className="text-sm text-muted-foreground">
                  Focus on your University Portal password - it's compromised and needs immediate attention
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-accent">Regular Security Audits</p>
                <p className="text-sm text-muted-foreground">
                  Schedule monthly password reviews to maintain optimal security
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};