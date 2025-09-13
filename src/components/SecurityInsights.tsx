import { SecurityInsight } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, AlertTriangle, Key, Plus, Lightbulb } from 'lucide-react';

interface SecurityInsightsProps {
  insights: SecurityInsight[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'AlertTriangle': return AlertTriangle;
    case 'Key': return Key;
    case 'Plus': return Plus;
    default: return Lightbulb;
  }
};

export const SecurityInsights = ({ insights }: SecurityInsightsProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Eye className="h-5 w-5" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight) => {
            const IconComponent = getIcon(insight.icon);
            const borderColor = insight.priority === 'high' ? 'border-destructive/50' : 
                               insight.priority === 'medium' ? 'border-warning/50' : 'border-primary/50';
            const bgColor = insight.priority === 'high' ? 'bg-destructive/5' : 
                           insight.priority === 'medium' ? 'bg-warning/5' : 'bg-primary/5';
            
            return (
              <div 
                key={insight.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${borderColor} ${bgColor} transition-all hover:shadow-sm`}
              >
                <IconComponent className={`h-5 w-5 mt-0.5 ${
                  insight.priority === 'high' ? 'text-destructive' : 
                  insight.priority === 'medium' ? 'text-warning' : 'text-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {insight.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};