import { Navbar } from '@/components/navbar';
import { getTrendingVideos } from '@/app/actions';
import { AnalyticsCharts } from '@/components/analytics-charts';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

export default async function AnalyticsPage() {
  const videos = await getTrendingVideos(100);
  
  const totalViews = videos.reduce((acc, v) => acc + v.views, 0);
  const averageViews = videos.length > 0 ? Math.round(totalViews / videos.length) : 0;
  const topVideo = videos[0];

  const stats = [
    { label: 'Total Network Reach', value: totalViews.toLocaleString(), icon: Users, color: 'text-primary' },
    { label: 'Average Heat Score', value: averageViews.toLocaleString(), icon: Activity, color: 'text-accent' },
    { label: 'Viral Saturation', value: `${videos.filter(v => v.views > 1000).length}%`, icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-2">
            <BarChart3 className="w-4 h-4" />
            Performance Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter">
            Insights <span className="text-primary italic">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time telemetry and data-driven results from the ViralFyre network.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6 rounded-2xl border border-white/5 glow-primary/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-3xl font-headline font-bold mt-1">{stat.value}</h4>
              </div>
              <div className={`p-4 bg-background rounded-full ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-card/50 p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-primary" />
              Content Trajectory
            </h2>
            <AnalyticsCharts videos={videos} />
          </div>

          <div className="bg-card/30 p-8 rounded-3xl border border-white/5 overflow-hidden">
            <h2 className="text-2xl font-headline font-bold mb-6">Network Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-muted-foreground text-sm uppercase tracking-widest">
                    <th className="pb-4 font-medium">Rank</th>
                    <th className="pb-4 font-medium">Video Title</th>
                    <th className="pb-4 font-medium text-right">Engagement</th>
                    <th className="pb-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {videos.slice(0, 10).map((video, idx) => (
                    <tr key={video.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 font-headline font-bold text-lg text-muted-foreground group-hover:text-primary transition-colors">
                        #{idx + 1}
                      </td>
                      <td className="py-4">
                        <p className="font-bold text-foreground line-clamp-1">{video.viralTitle || video.title}</p>
                        <p className="text-xs text-muted-foreground">ID: {video.id}</p>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">
                        {video.views.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${video.views > 1000 ? 'border-primary text-primary bg-primary/10' : 'border-muted text-muted bg-muted/10'}`}>
                          {video.views > 1000 ? 'SUPERHEATED' : 'STABLE'}
                        </span>
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
}
