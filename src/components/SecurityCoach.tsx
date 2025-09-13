import { GraduationCap, BookOpen, CheckCircle, Clock, Star, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const SecurityCoach = () => {
  const learningModules = [
    {
      id: 1,
      title: 'Password Fundamentals',
      description: 'Learn the basics of creating strong, unique passwords',
      progress: 100,
      completed: true,
      duration: '15 min',
      points: 100,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Two-Factor Authentication',
      description: 'Master the art of multi-factor security',
      progress: 75,
      completed: false,
      duration: '20 min',
      points: 150,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Phishing Detection',
      description: 'Identify and avoid common phishing attempts',
      progress: 30,
      completed: false,
      duration: '25 min',
      points: 200,
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Advanced Threat Protection',
      description: 'Protect against sophisticated cyber attacks',
      progress: 0,
      completed: false,
      duration: '35 min',
      points: 300,
      difficulty: 'Advanced'
    }
  ];

  const dailyTips = [
    {
      id: 1,
      title: 'Use Password Managers',
      description: 'Let technology help you manage unique passwords for every account',
      category: 'Tools'
    },
    {
      id: 2,
      title: 'Regular Security Audits',
      description: 'Review your passwords monthly and update weak ones',
      category: 'Habits'
    },
    {
      id: 3,
      title: 'Stay Updated',
      description: 'Keep your apps and systems updated with the latest security patches',
      category: 'Maintenance'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-accent';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-8 w-8 text-primary animate-pulse-cyber" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Security Coach
          </h1>
          <p className="text-muted-foreground">Learn cybersecurity best practices through interactive modules</p>
        </div>
      </div>

      {/* Learning Progress Overview */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">250</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">1</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-muted-foreground">95</div>
              <p className="text-sm text-muted-foreground">Minutes Learned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            Learning Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningModules.map((module) => (
              <div key={module.id} className="p-4 border rounded-lg hover:shadow-cyber transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{module.title}</h3>
                      {module.completed && <CheckCircle className="h-4 w-4 text-accent" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {module.points} pts
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`${getDifficultyColor(module.difficulty)} border-current`}
                      >
                        {module.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant={module.completed ? "outline" : "default"} 
                    size="sm"
                    className="ml-4"
                  >
                    {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Security Tips */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Star className="h-5 w-5" />
            Daily Security Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyTips.map((tip) => (
              <div key={tip.id} className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-accent">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                  <Badge variant="outline" className="text-accent border-accent/30">
                    {tip.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};