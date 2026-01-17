import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Flame, 
  AlertCircle,
  Clock,
  Activity
} from 'lucide-react';
import Navbar from '../components/Navbar';

// Mock data for charts
const degradationData = [
  { time: '00:00', cracks: 2, blockages: 1, corrosion: 3 },
  { time: '04:00', cracks: 3, blockages: 1, corrosion: 4 },
  { time: '08:00', cracks: 5, blockages: 2, corrosion: 5 },
  { time: '12:00', cracks: 4, blockages: 3, corrosion: 7 },
  { time: '16:00', cracks: 8, blockages: 2, corrosion: 6 },
  { time: '20:00', cracks: 6, blockages: 4, corrosion: 9 },
  { time: '24:00', cracks: 9, blockages: 3, corrosion: 8 },
];

const gasData = [
  { zone: 'Zone A', ch4: 32, co: 15 },
  { zone: 'Zone B', ch4: 45, co: 28 },
  { zone: 'Zone C', ch4: 78, co: 42 },
  { zone: 'Zone D', ch4: 23, co: 18 },
  { zone: 'Zone E', ch4: 56, co: 35 },
];

const recentDetections = [
  { id: 1, type: 'Crack', timestamp: '14:32:15', severity: 'high', confidence: 94 },
  { id: 2, type: 'Corrosion', timestamp: '14:28:42', severity: 'medium', confidence: 87 },
  { id: 3, type: 'Blockage', timestamp: '14:21:08', severity: 'low', confidence: 92 },
  { id: 4, type: 'Crack', timestamp: '14:15:33', severity: 'high', confidence: 89 },
  { id: 5, type: 'Corrosion', timestamp: '14:08:19', severity: 'medium', confidence: 78 },
  { id: 6, type: 'Crack', timestamp: '13:55:44', severity: 'low', confidence: 65 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-primary/30">
        <p className="font-display text-sm text-primary mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/30';
      case 'medium': return 'text-warning bg-warning/10 border-warning/30';
      case 'low': return 'text-success bg-success/10 border-success/30';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 px-6 pb-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-primary rounded-full" />
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wider">
                Mission Metrics
              </h1>
              <p className="text-muted-foreground text-sm">
                Detection analysis and temporal degradation logs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase
                  transition-all duration-200 border
                  ${timeRange === range 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
                  }
                `}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Degradation Line Chart */}
          <div className="col-span-8 glass-card-glow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-display text-sm tracking-wider uppercase">
                  Temporal Degradation Logs
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs font-display text-primary uppercase tracking-wider">
                  Real-time
                </span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={degradationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(215 15% 55%)" 
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="hsl(215 15% 55%)" 
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span className="text-xs uppercase">{value}</span>}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cracks" 
                    stroke="hsl(0 72% 51%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(0 72% 51%)', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(0 72% 51%)', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blockages" 
                    stroke="hsl(38 92% 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(38 92% 50%)', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(38 92% 50%)', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="corrosion" 
                    stroke="hsl(24 100% 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(24 100% 50%)', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(24 100% 50%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Gas Bar Chart */}
          <div className="col-span-4 glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-5 h-5 text-primary" />
              <h3 className="font-display text-sm tracking-wider uppercase">
                Gas Accumulation
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gasData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 18%)" />
                  <XAxis 
                    type="number" 
                    stroke="hsl(215 15% 55%)" 
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    dataKey="zone" 
                    type="category" 
                    stroke="hsl(215 15% 55%)" 
                    tick={{ fontSize: 11 }}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-xs uppercase">{value}</span>}
                  />
                  <Bar 
                    dataKey="ch4" 
                    fill="hsl(24 100% 50%)" 
                    radius={[0, 4, 4, 0]}
                    name="CH4"
                  />
                  <Bar 
                    dataKey="co" 
                    fill="hsl(38 92% 50%)" 
                    radius={[0, 4, 4, 0]}
                    name="CO"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Detections Table */}
          <div className="col-span-12 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h3 className="font-display text-sm tracking-wider uppercase">
                  Recent Detections
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-xs">Last updated: 14:32:15</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted-foreground">Defect Type</th>
                    <th className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted-foreground">Timestamp</th>
                    <th className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted-foreground">Severity</th>
                    <th className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted-foreground">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDetections.map((detection) => (
                    <tr key={detection.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">#{detection.id.toString().padStart(4, '0')}</td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-foreground">{detection.type}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{detection.timestamp}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getSeverityColor(detection.severity)}`}>
                          {detection.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${detection.confidence}%` }}
                            />
                          </div>
                          <span className="font-mono text-sm text-primary">{detection.confidence}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;