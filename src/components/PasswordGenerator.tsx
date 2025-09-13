import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Zap, Shield, Clock, Dices } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { generateSecurePassword, analyzePasswordStrength } from '@/lib/password-utils';
import { toast } from '@/hooks/use-toast';

export const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  const generatePassword = () => {
    const newPassword = generateSecurePassword(
      length[0],
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    if (password) {
      const result = analyzePasswordStrength(password);
      setAnalysis(result);
    }
  }, [password]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Password Copied!",
      description: "Secure password copied to clipboard",
    });
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'strong': return 'text-accent border-accent bg-accent/20';
      case 'good': return 'text-primary border-primary bg-primary/20';
      case 'fair': return 'text-warning border-warning bg-warning/20';
      case 'weak': return 'text-destructive border-destructive bg-destructive/20';
      default: return 'text-destructive border-destructive bg-destructive/20';
    }
  };

  const getStrengthIcon = (strength) => {
    switch (strength) {
      case 'strong': return <Shield className="h-4 w-4" />;
      case 'good': return <Zap className="h-4 w-4" />;
      case 'fair': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Password Display */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dices className="h-5 w-5 text-primary animate-pulse-cyber" />
            Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Generated Password */}
            <div className="relative">
              <div className="terminal p-4 text-lg font-mono break-all select-all bg-muted/50 border-2 border-primary/30 rounded-lg">
                {password || 'Generating...'}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyPassword}
                  className="h-8 w-8 p-0 hover:bg-primary/20"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={generatePassword}
                  className="h-8 w-8 p-0 hover:bg-primary/20"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Password Analysis */}
            {analysis && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Strength Analysis</span>
                  <Badge className={getStrengthColor(analysis.strength)}>
                    {getStrengthIcon(analysis.strength)}
                    <span className="ml-1 capitalize">{analysis.strength}</span>
                  </Badge>
                </div>
                
                <Progress value={analysis.score} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-mono">{analysis.score}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entropy:</span>
                      <span className="font-mono">{analysis.entropy} bits</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Time to crack:</div>
                    <div className="terminal text-xs p-2 bg-primary/10 border border-primary/30 rounded">
                      {analysis.timeToHack}
                    </div>
                  </div>
                </div>

                {analysis.feedback.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Recommendations:</div>
                    <div className="space-y-1">
                      {analysis.feedback.map((tip, index) => (
                        <div key={index} className="text-xs text-warning bg-warning/10 p-2 rounded border border-warning/30">
                          • {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generator Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Generation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Length Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="length">Password Length</Label>
                <Badge variant="outline" className="font-mono">
                  {length[0]} characters
                </Badge>
              </div>
              <Slider
                id="length"
                value={length}
                onValueChange={setLength}
                max={50}
                min={8}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8</span>
                <span>50</span>
              </div>
            </div>

            {/* Character Type Switches */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label htmlFor="uppercase" className="text-sm font-medium">
                    Uppercase (A-Z)
                  </Label>
                  <p className="text-xs text-muted-foreground">ABCDEF...</p>
                </div>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label htmlFor="lowercase" className="text-sm font-medium">
                    Lowercase (a-z)
                  </Label>
                  <p className="text-xs text-muted-foreground">abcdef...</p>
                </div>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label htmlFor="numbers" className="text-sm font-medium">
                    Numbers (0-9)
                  </Label>
                  <p className="text-xs text-muted-foreground">123456...</p>
                </div>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label htmlFor="symbols" className="text-sm font-medium">
                    Symbols (!@#$)
                  </Label>
                  <p className="text-xs text-muted-foreground">!@#$%^...</p>
                </div>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-3">
              <Label>Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLength([12]);
                    setIncludeUppercase(true);
                    setIncludeLowercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(false);
                  }}
                  className="justify-start"
                >
                  🏠 Basic (12 chars)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLength([16]);
                    setIncludeUppercase(true);
                    setIncludeLowercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(true);
                  }}
                  className="justify-start"
                >
                  🔒 Strong (16 chars)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLength([24]);
                    setIncludeUppercase(true);
                    setIncludeLowercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(true);
                  }}
                  className="justify-start"
                >
                  🏦 Banking (24 chars)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLength([32]);
                    setIncludeUppercase(true);
                    setIncludeLowercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(true);
                  }}
                  className="justify-start"
                >
                  🔐 Ultra (32 chars)
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};