'use client';

import { Video } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Play, Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { VideoModal } from './video-modal';

interface VideoCardProps {
  video: Video;
  className?: string;
  priority?: boolean;
}

export function VideoCard({ video, className, priority = false }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to extract YouTube ID for thumbnail
  const getYoutubeThumb = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : `https://picsum.photos/seed/${video.id}/800/450`;
  };

  return (
    <>
      <Card 
        className={`group relative overflow-hidden border-none bg-card transition-all duration-300 hover:scale-[1.02] cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={getYoutubeThumb(video.url)}
            alt={video.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="video thumbnail"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {video.views > 1000 && (
              <Badge variant="default" className="bg-primary hover:bg-primary text-white font-bold px-2 py-0.5 gap-1">
                <Flame className="w-3 h-3 fill-white" />
                HOT
              </Badge>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary/90 p-4 rounded-full glow-primary transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>

        <CardContent className="p-4 bg-card/80 backdrop-blur-sm border-t border-white/5">
          <h3 className="text-lg font-headline font-bold line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {video.viralTitle || video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
            {video.viralSummary || video.description || 'Watch the latest viral sensation heating up ViralFyre.'}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Eye className="w-4 h-4 text-primary" />
            <span>{video.views.toLocaleString()} views</span>
          </div>
        </CardContent>
      </Card>

      <VideoModal video={video} isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
