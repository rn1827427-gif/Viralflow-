import { Navbar } from '@/components/navbar';
import { getTrendingVideos } from '@/app/actions';
import { VideoCard } from '@/components/video-card';
import { Flame, TrendingUp } from 'lucide-react';

export default async function Home() {
  const videos = await getTrendingVideos(12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <header className="mb-12 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
              <TrendingUp className="w-4 h-4" />
              Real-time Performance
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-none">
              Trending <span className="text-primary italic">Now</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Explore the hottest content burning through the charts. Powered by ViralFyre's real-time analytics.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-card/80 border border-primary/20 px-5 py-2.5 rounded-full glow-primary/10 animate-pulse">
            <Flame className="w-5 h-5 text-primary fill-primary" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Active Heat Ranking Live</span>
          </div>
        </header>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 bg-card/30 rounded-[2.5rem] border-2 border-dashed border-white/5">
            <div className="p-8 bg-background/50 rounded-full border border-white/5 shadow-inner">
              <Flame className="w-16 h-16 text-muted/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">No heat detected yet</h3>
              <p className="text-muted-foreground text-lg max-w-xs mx-auto">
                Be the first to submit a viral hit and start the fire.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
            {videos.map((video, idx) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                className={idx === 0 ? 'sm:col-span-2 lg:col-span-2 row-span-2' : ''}
                priority={idx < 4}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-16 mt-20 bg-card/10">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-primary/50" />
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            © 2024 ViralFyre. Ignition for the next generation of creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
