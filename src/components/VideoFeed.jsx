import { useState, useEffect } from 'react';
import { Camera, Cpu, Crosshair, Thermometer, Wifi } from 'lucide-react';

const VideoFeed = () => {
  const [frameCount, setFrameCount] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameCount(prev => prev + 1);
      setTimestamp(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-border">
      {/* Simulated video feed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-black">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-background opacity-30" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="scan-line" />
        </div>
      </div>
      
      {/* Video overlay effects */}
      <div className="video-overlay" />
      
      {/* HUD Overlays */}
      {/* Top Left - Camera Info */}
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded border border-primary/30">
          <Camera className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-primary">HD 1080p</span>
        </div>
        <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded border border-primary/30">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-primary">AI ACTIVE</span>
        </div>
      </div>
      
      {/* Top Right - Timestamp */}
      <div className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded border border-border">
        <span className="text-xs font-mono text-muted-foreground">REC</span>
        <span className="text-xs font-mono text-destructive ml-2 animate-pulse">●</span>
        <span className="text-xs font-mono text-foreground ml-3">{timestamp}</span>
      </div>
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="w-16 h-16 text-primary/40" strokeWidth={1} />
      </div>
      
      {/* Bottom Left - Detection Box Simulation */}
      <div className="absolute bottom-20 left-20 w-32 h-24 border-2 border-warning rounded animate-pulse">
        <div className="absolute -top-6 left-0 bg-warning/90 px-2 py-0.5 rounded text-xs font-bold text-warning-foreground">
          CRACK 87%
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t border-border px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">FRAME:</span>
              <span className="text-xs font-mono text-primary">{frameCount.toString().padStart(6, '0')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-success" />
              <span className="text-xs font-mono text-muted-foreground">LATENCY:</span>
              <span className="text-xs font-mono text-foreground">24ms</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3 h-3 text-info" />
              <span className="text-xs font-mono text-info">IR OVERLAY</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
      <div className="absolute bottom-12 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
      <div className="absolute bottom-12 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
    </div>
  );
};

export default VideoFeed;