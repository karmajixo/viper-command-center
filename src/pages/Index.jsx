import { 
  Brain, 
  Thermometer, 
  Battery, 
  Wifi, 
  AlertTriangle,
  CheckCircle2,
  Zap,
  Radio
} from 'lucide-react';
import Navbar from '../components/Navbar';
import VideoFeed from '../components/VideoFeed';
import GasGauge from '../components/GasGauge';
import StatusCard from '../components/StatusCard';
import TelemetryItem from '../components/TelemetryItem';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 px-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-primary rounded-full" />
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wider">
                VIPER CONTROL HUD
              </h1>
              <p className="text-muted-foreground text-sm">
                Real-time Surveillance Feed | Mission ID: VPR-2026-0117
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Video Feed - Left Side */}
          <div className="col-span-9">
            <div className="aspect-video">
              <VideoFeed />
            </div>
            
            {/* Status Cards Below Video */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* AI Detection Status */}
              <StatusCard 
                title="AI Detection" 
                icon={Brain} 
                status="warning"
              >
                <TelemetryItem label="Active Model" value="YOLOv8-NDT" />
                <TelemetryItem label="Inference" value="24" unit="ms" status="success" />
                <TelemetryItem label="Detections" value="3" status="warning" />
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between bg-warning/10 px-3 py-2 rounded border border-warning/30">
                    <span className="text-xs text-warning">CRACK DETECTED</span>
                    <span className="text-xs font-bold text-warning">87%</span>
                  </div>
                  <div className="flex items-center justify-between bg-muted px-3 py-2 rounded border border-border">
                    <span className="text-xs text-muted-foreground">CORROSION</span>
                    <span className="text-xs font-bold text-foreground">42%</span>
                  </div>
                </div>
              </StatusCard>
              
              {/* Thermal IR Status */}
              <StatusCard 
                title="Thermal IR" 
                icon={Thermometer} 
                status="online"
              >
                <TelemetryItem label="Sensor" value="MLX90640" />
                <TelemetryItem label="Resolution" value="32×24" unit="px" />
                <TelemetryItem label="Temp Range" value="-40 to 300" unit="°C" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-info">23.4°C</div>
                    <div className="text-xs text-muted-foreground">MIN</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">67.8°C</div>
                    <div className="text-xs text-muted-foreground">MAX</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">42.1°C</div>
                    <div className="text-xs text-muted-foreground">AVG</div>
                  </div>
                </div>
              </StatusCard>
              
              {/* System Status */}
              <StatusCard 
                title="System Status" 
                icon={Zap} 
                status="online"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground">BATTERY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-success rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-success">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground">SIGNAL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-success rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-success">-42dBm</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">FLASK API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-xs font-bold text-success">CONNECTED</span>
                    </div>
                  </div>
                </div>
              </StatusCard>
            </div>
          </div>
          
          {/* Right Sidebar - Gas Gauges */}
          <div className="col-span-3 space-y-4">
            <div className="glass-card-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-display text-sm tracking-wider">GAS SENSORS</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <GasGauge value={32} max={100} label="CH4" unit="ppm" />
                <GasGauge value={78} max={100} label="CO" unit="ppm" />
              </div>
            </div>
            
            {/* Environmental Telemetry */}
            <div className="glass-card p-4">
              <h3 className="font-display text-sm tracking-wider mb-4">ENVIRONMENT</h3>
              <div className="space-y-3">
                <TelemetryItem label="Ambient Temp" value="28.4" unit="°C" />
                <TelemetryItem label="Humidity" value="67" unit="%" />
                <TelemetryItem label="Pressure" value="1013" unit="hPa" />
                <TelemetryItem label="Depth" value="12.4" unit="m" />
              </div>
            </div>
            
            {/* Robot Telemetry */}
            <div className="glass-card p-4">
              <h3 className="font-display text-sm tracking-wider mb-4">ROVER STATUS</h3>
              <div className="space-y-3">
                <TelemetryItem label="Speed" value="0.3" unit="m/s" />
                <TelemetryItem label="Distance" value="47.2" unit="m" />
                <TelemetryItem label="Runtime" value="01:24:36" />
                <TelemetryItem label="CPU Temp" value="52" unit="°C" status="success" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;