import Link from 'next/link';
import { Flame, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Flame className="w-8 h-8 text-primary fill-primary animate-pulse" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tighter text-foreground">
            Viral<span className="text-primary">Fyre</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/submit">
            <Button className="gap-2 px-6 h-12 rounded-xl text-base font-bold glow-primary hover:scale-[1.02] transition-transform">
              <Plus className="w-5 h-5 stroke-[3px]" />
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
