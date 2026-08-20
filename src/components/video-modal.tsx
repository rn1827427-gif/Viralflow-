'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Video, incrementVideoViews } from '@/app/actions';
import { Eye, Flame, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface VideoModalProps {
  video: Video;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideoModal({ video, isOpen, onOpenChange }: VideoModalProps) {
  
  const onPlay = async () => {
    await incrementVideoViews(video.id);
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Video link has been copied to your clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (open) onPlay();
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-background border-primary/20">
        <DialogHeader className="p-4 border-b border-white/5 bg-card/50">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-xl font-headline font-bold text-foreground">
              {video.viralTitle || video.title}
            </DialogTitle>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" className="rounded-full" onClick={share}>
                <Share2 className="w-5 h-5 text-primary" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1&mute=0`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6 bg-card/30 space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="font-bold">{video.views.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent animate-pulse" />
              <span className="font-bold">Trending</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">About this video</h4>
            <p className="text-muted-foreground leading-relaxed">
              {video.viralSummary || video.description || 'This video is currently trending on ViralFyre.'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
