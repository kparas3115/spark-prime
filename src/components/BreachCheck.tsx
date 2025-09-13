import { useState } from 'react';
import { AlertTriangle, MapPin, Calendar, Shield, Search, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockPasswords, mockBreachLocations } from '@/lib/mock-data';

export const BreachCheck = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const compromisedPasswords = mockPasswords.filter(p => p.isCompromised);
  const breachLocations = mockBreachLocations;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-8 w-8 text-destructive animate-pulse" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Breach Check
          </h1>
          <p className="text-muted-foreground">Monitor your passwords against known data breaches</p>
        </div>
      </div>

      {/* Scan Controls */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Password Breach Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search for specific password or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleScan} 
              disabled={isScanning}
              className="bg-primary hover:bg-primary/90"
            >
              {isScanning ? 'Scanning...' : 'Scan All'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">
                {compromisedPasswords.length}
              </div>
              <p className="text-sm text-muted-foreground">Compromised</p>
            </div>
            
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">
                {mockPasswords.length - compromisedPasswords.length}
              </div>
              <p className="text-sm text-muted-foreground">Safe</p>
            </div>
            
            <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
              <Calendar className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">
                {new Date().toLocaleDateString()}
              </div>
              <p className="text-sm text-muted-foreground">Last Scan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compromised Passwords */}
      {compromisedPasswords.length > 0 && (
        <Card className="glass-card border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Compromised Passwords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Critical:</strong> These passwords have been found in known data breaches. 
                Change them immediately to protect your accounts.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {compromisedPasswords.map((password) => (
                <div key={password.id} className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <div>
                        <h3 className="font-medium">{password.title}</h3>
                        <p className="text-sm text-muted-foreground">{password.username}</p>
                      </div>
                    </div>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Website:</p>
                      <p className="font-medium">{password.website}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Updated:</p>
                      <p className="font-medium">{password.lastUpdated.toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <Button variant="destructive" size="sm" className="mt-3">
                    Update Password Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breach Locations Map */}
      <Card className="glass-card border-warning/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-warning" />
            Breach Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Globe className="h-4 w-4" />
            <AlertDescription>
              Interactive map showing where your compromised passwords were breached. 
              <strong>Note:</strong> To enable full map functionality, please add your Google Maps API key.
            </AlertDescription>
          </Alert>
          
          {/* Placeholder for map - would need Google Maps integration */}
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
            <div className="text-center space-y-2">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive Breach Map</p>
              <p className="text-xs text-muted-foreground">Google Maps integration available</p>
            </div>
          </div>
          
          {/* Breach Location Details */}
          <div className="mt-6 space-y-3">
            <h4 className="font-medium">Detected Breach Locations:</h4>
            {breachLocations.map((location) => (
              <div key={location.id} className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <MapPin className="h-5 w-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium">{location.breachName}</p>
                  <p className="text-sm text-muted-foreground">
                    {location.location.city}, {location.location.country} • {location.date.toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline" className="text-warning border-warning/30">
                  {location.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};