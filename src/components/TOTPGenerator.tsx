import { useState, useEffect } from 'react';
import { Smartphone, Copy, Plus, QrCode, Timer, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateTOTP } from '@/lib/password-utils';
import { mockTOTPCodes } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';

export const TOTPGenerator = () => {
  const [codes, setCodes] = useState(mockTOTPCodes);
  const [newLabel, setNewLabel] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Update TOTP codes every second
  useEffect(() => {
    const updateCodes = () => {
      setCodes(prevCodes => 
        prevCodes.map(code => {
          const { code: newCode, timeRemaining } = generateTOTP(code.secret);
          return { ...code, code: newCode, timeRemaining };
        })
      );
    };

    updateCodes();
    const interval = setInterval(updateCodes, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "TOTP Code Copied!",
      description: `${label} authentication code copied to clipboard`,
    });
  };

  const addNewTOTP = () => {
    if (!newLabel || !newSecret) return;

    const newTOTP = {
      id: Date.now().toString(),
      label: newLabel,
      secret: newSecret,
      code: '000000',
      timeRemaining: 30
    };

    setCodes(prev => [...prev, newTOTP]);
    setNewLabel('');
    setNewSecret('');
    setIsAddDialogOpen(false);
    
    toast({
      title: "TOTP Added!",
      description: `${newLabel} has been added to your authenticator`,
    });
  };

  const removeTOTP = (id: string) => {
    setCodes(prev => prev.filter(code => code.id !== id));
    toast({
      title: "TOTP Removed",
      description: "Authentication code has been removed",
    });
  };

  const getTimeColor = (timeRemaining: number) => {
    if (timeRemaining > 20) return 'text-accent';
    if (timeRemaining > 10) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary animate-pulse-cyber" />
              TOTP Authenticator ({codes.length})
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-cyber">
                  <Plus className="h-4 w-4 mr-2" />
                  Add TOTP
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>Add New TOTP Code</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="label">Service Label</Label>
                    <Input
                      id="label"
                      placeholder="e.g., GitHub, Google, Discord"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="bg-muted/30 border-primary/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secret">Secret Key</Label>
                    <Input
                      id="secret"
                      placeholder="JBSWY3DPEHPK3PXP..."
                      value={newSecret}
                      onChange={(e) => setNewSecret(e.target.value)}
                      className="bg-muted/30 border-primary/30 font-mono"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addNewTOTP} className="btn-cyber flex-1">
                      Add TOTP
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>Two-Factor Authentication codes refresh automatically every 30 seconds.</p>
            <p className="text-accent mt-1">
              ⚡ Pro tip: These codes add an extra layer of security to your accounts!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* TOTP Code Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {codes.map((totpCode) => (
          <Card key={totpCode.id} className="glass-card hover:shadow-cyber transition-all duration-300 group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{totpCode.label}</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeTOTP(totpCode.id)}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* TOTP Code Display */}
                <div className="relative">
                  <div className="terminal p-4 text-center bg-primary/10 border-2 border-primary/30 rounded-lg">
                    <div className="text-3xl font-mono font-bold tracking-wider">
                      {totpCode.code}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyCode(totpCode.code, totpCode.label)}
                    className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {/* Timer and Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time remaining</span>
                    <Badge 
                      variant="outline" 
                      className={`font-mono ${getTimeColor(totpCode.timeRemaining)}`}
                    >
                      <Timer className="h-3 w-3 mr-1" />
                      {totpCode.timeRemaining}s
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={(totpCode.timeRemaining / 30) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyCode(totpCode.code, totpCode.label)}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const { code: newCode, timeRemaining } = generateTOTP(totpCode.secret);
                      setCodes(prev => 
                        prev.map(code => 
                          code.id === totpCode.id 
                            ? { ...code, code: newCode, timeRemaining }
                            : code
                        )
                      );
                    }}
                    className="h-9 w-9 p-0"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {/* QR Code Info */}
                <div className="text-xs text-muted-foreground text-center">
                  <QrCode className="h-4 w-4 inline mr-1" />
                  Secret: {totpCode.secret.substring(0, 8)}...
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {codes.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Smartphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No TOTP codes yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first two-factor authentication code to get started
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="btn-cyber">
              <Plus className="h-4 w-4 mr-2" />
              Add First TOTP
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Info */}
      <Card className="glass-card border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Smartphone className="h-5 w-5" />
            About TOTP Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="text-accent mt-1">🔐</div>
              <div>
                <p className="font-medium">Time-based One-Time Passwords</p>
                <p className="text-muted-foreground">
                  TOTP codes change every 30 seconds, providing strong protection against account takeovers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-primary mt-1">⚡</div>
              <div>
                <p className="font-medium">Works Offline</p>
                <p className="text-muted-foreground">
                  Generate codes without internet connection using cryptographic algorithms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-warning mt-1">📱</div>
              <div>
                <p className="font-medium">Multi-Device Sync</p>
                <p className="text-muted-foreground">
                  Use the same secret key on multiple devices for backup access.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};