import { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Eye, EyeOff, Star, AlertTriangle, Shield, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Password } from '@/types';
import { mockPasswords } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';

interface PasswordVaultProps {
  passwords?: Password[];
}

export const PasswordVault = ({ passwords = mockPasswords }: PasswordVaultProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());

  const categories = ['all', 'social', 'banking', 'education', 'entertainment', 'work', 'other'];

  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         password.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-accent';
    if (strength >= 60) return 'text-primary';
    if (strength >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      social: '👥',
      banking: '💰',
      education: '🎓',
      entertainment: '🎬',
      work: '💼',
      other: '📂'
    };
    return icons[category] || '📂';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filter Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Password Vault ({filteredPasswords.length})
            </CardTitle>
            <Button className="btn-cyber">
              <Plus className="h-4 w-4 mr-2" />
              Add Password
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search passwords, usernames, or websites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-primary/30 focus:border-primary"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-7 bg-muted/30">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category === 'all' ? 'All' : getCategoryIcon(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Password List */}
      <div className="grid gap-4">
        {filteredPasswords.map((password) => (
          <Card key={password.id} className="glass-card hover:shadow-cyber transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Password Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{getCategoryIcon(password.category)}</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                        {password.title}
                        {password.isFavorite && <Star className="h-4 w-4 text-warning fill-warning" />}
                        {password.isCompromised && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
                      </h3>
                      <p className="text-sm text-muted-foreground">{password.website}</p>
                    </div>
                  </div>

                  {/* Username and Password Fields */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-20">Username:</span>
                      <code className="terminal text-sm flex-1">{password.username}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(password.username, 'Username')}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-20">Password:</span>
                      <code className="terminal text-sm flex-1">
                        {visiblePasswords.has(password.id) ? password.password : '••••••••••••'}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePasswordVisibility(password.id)}
                        className="h-8 w-8 p-0"
                      >
                        {visiblePasswords.has(password.id) ? 
                          <EyeOff className="h-3 w-3" /> : 
                          <Eye className="h-3 w-3" />
                        }
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(password.password, 'Password')}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  {password.tags && password.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {password.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Password Strength & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getStrengthColor(password.strength)}`}>
                      {password.strength}%
                    </div>
                    <Progress 
                      value={password.strength} 
                      className="w-20 h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Strength</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`https://${password.website}`, '_blank')}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Updated {password.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPasswords.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No passwords found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Add your first password to get started'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};