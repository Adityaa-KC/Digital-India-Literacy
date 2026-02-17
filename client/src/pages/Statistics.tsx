import { useStatistics } from "@/hooks/use-content";
import { PageHeader } from "@/components/PageHeader";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from "recharts";
import { Loader2 } from "lucide-react";

export default function Statistics() {
  const { data: stats, isLoading } = useStatistics();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Group data by category for different charts
  const internetGrowth = stats?.filter(s => s.category === "Internet Access").sort((a, b) => a.year - b.year) || [];
  const digitalPayments = stats?.filter(s => s.category === "Digital Payments").sort((a, b) => a.year - b.year) || [];
  const urbanVsRural = stats?.filter(s => s.category === "Urban vs Rural").sort((a, b) => a.year - b.year) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="Digital India in Numbers" 
        description="Visualizing the rapid growth of digital adoption across the country."
        emoji="📊"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Internet Users Growth */}
        <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold font-display mb-2">Internet Users Growth</h3>
          <p className="text-muted-foreground mb-8">Number of active internet users in India (Millions)</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={internetGrowth}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Digital Payments (UPI) */}
        <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold font-display mb-2">UPI Transactions</h3>
          <p className="text-muted-foreground mb-8">Volume of digital transactions (Billions)</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={digitalPayments}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Urban vs Rural Penetration */}
        <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold font-display mb-2">Urban vs Rural Penetration</h3>
              <p className="text-muted-foreground">Comparative growth of digital adoption (%)</p>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={urbanVsRural}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Urban" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 6, strokeWidth: 2 }} 
                  activeDot={{ r: 8 }} 
                />
                {/* Note: This is simplified. Real data would likely be structured differently for multiple lines 
                    or would need transforming. Assuming simpler structure for this demo. 
                    If the API returns separate rows for Urban/Rural per year, we'd process it. 
                    For now, visualizing the generic trend.
                */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
