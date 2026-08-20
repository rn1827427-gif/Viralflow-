'use client';

import { Video } from '@/app/actions';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';

interface AnalyticsChartsProps {
  videos: Video[];
}

export function AnalyticsCharts({ videos }: AnalyticsChartsProps) {
  // Sort videos by views for the chart
  const chartData = [...videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
    .map(v => ({
      name: v.viralTitle || v.title,
      views: v.views,
      shortName: (v.viralTitle || v.title).substring(0, 10) + '...'
    }));

  const pieData = [
    { name: 'Viral Hits', value: videos.filter(v => v.views > 1000).length, fill: 'hsl(var(--primary))' },
    { name: 'Emerging', value: videos.filter(v => v.views <= 1000).length, fill: 'hsl(var(--accent))' },
  ];

  const barConfig = {
    views: {
      label: 'Views',
      color: 'hsl(var(--primary))'
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="bg-card p-6 rounded-xl border border-white/5 space-y-4 glow-primary/10">
        <h3 className="text-lg font-headline font-bold">Top Performing Tracks</h3>
        <div className="h-[300px] w-full">
          <ChartContainer config={barConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="shortName" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary))`} fillOpacity={1 - index * 0.08} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-white/5 space-y-4 glow-accent/10">
        <h3 className="text-lg font-headline font-bold">Audience Heat Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 text-sm">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
