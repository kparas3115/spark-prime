import { Trophy, Star, Medal, Award, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockAchievements } from '@/lib/mock-data';

export const Achievements = () => {
  const earnedAchievements = mockAchievements.filter(a => a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);
  const completionRate = (earnedAchievements.length / mockAchievements.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return Trophy;
      case 'activity': return Star;
      case 'learning': return Award;
      default: return Medal;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'text-primary border-primary/30 bg-primary/5';
      case 'activity': return 'text-accent border-accent/30 bg-accent/5';
      case 'learning': return 'text-warning border-warning/30 bg-warning/5';
      default: return 'text-muted-foreground border-muted/30 bg-muted/5';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-primary animate-pulse-cyber" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Achievements
          </h1>
          <p className="text-muted-foreground">Track your cybersecurity milestones and earn rewards</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{earnedAchievements.length}</div>
              <p className="text-sm text-muted-foreground">Earned</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">{totalPoints}</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <Award className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{Math.round(completionRate)}%</div>
              <p className="text-sm text-muted-foreground">Completion</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-muted-foreground">
                {mockAchievements.length - earnedAchievements.length}
              </div>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Achievement Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['security', 'activity', 'learning'].map((category) => {
          const categoryAchievements = mockAchievements.filter(a => a.category === category);
          const categoryEarned = categoryAchievements.filter(a => a.earned).length;
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <Card key={category} className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                  {category}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {categoryEarned}/{categoryAchievements.length} completed
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryAchievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border transition-all ${
                        achievement.earned 
                          ? getCategoryColor(category)
                          : 'border-muted/30 bg-muted/5 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{achievement.title}</h3>
                            {achievement.earned && (
                              <Badge variant="outline" className="text-xs">
                                {achievement.points} pts
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{achievement.earnedDate.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Achievements */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Star className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earnedAchievements
              .sort((a, b) => (b.earnedDate?.getTime() || 0) - (a.earnedDate?.getTime() || 0))
              .slice(0, 3)
              .map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-accent">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-accent border-accent/30">
                      +{achievement.points} pts
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.earnedDate?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};