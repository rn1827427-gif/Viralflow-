'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Sparkles, Send, Loader2, Wand2, Plus } from 'lucide-react';
import { generateAIHooks, addVideo } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    keywords: '',
    viralTitle: '',
    viralSummary: ''
  });
  
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerateHooks = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and description for the AI to analyze.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      const result = await generateAIHooks({
        videoTitle: formData.title,
        videoDescription: formData.description,
        videoKeywords: formData.keywords.split(',').map(k => k.trim())
      });
      
      setFormData(prev => ({
        ...prev,
        viralTitle: result.viralTitle,
        viralSummary: result.viralSummary
      }));

      toast({
        title: "Viral Hooks Generated!",
        description: "AI has optimized your content for maximum heat.",
      });
    } catch (err) {
      toast({
        title: "AI Generation Failed",
        description: "There was an error generating viral hooks. Try again.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    setLoading(true);
    try {
      // Basic URL formatting for embeds if it's a standard youtube link
      let finalUrl = formData.url;
      if (finalUrl.includes('youtube.com/watch?v=')) {
        finalUrl = finalUrl.replace('watch?v=', 'embed/');
      } else if (finalUrl.includes('youtu.be/')) {
        finalUrl = finalUrl.replace('youtu.be/', 'youtube.com/embed/');
      }

      await addVideo({
        title: formData.title,
        url: finalUrl,
        description: formData.description,
        viralTitle: formData.viralTitle,
        viralSummary: formData.viralSummary
      });

      toast({
        title: "Blast Off!",
        description: "Your video has been ignited and is now live on the feed.",
      });
      router.push('/');
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "Something went wrong while uploading your hit.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4">
            Ignite Your <span className="text-primary italic">Content</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Submit your link and let our AI turn it into a trending sensation.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-card/50 border-white/5 glow-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Source Details
                </CardTitle>
                <CardDescription>Enter the raw data for your video submission.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Original Title</Label>
                  <Input 
                    id="title" 
                    placeholder="E.g., My Awesome Vlog" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">YouTube URL</Label>
                  <Input 
                    id="url" 
                    placeholder="https://youtube.com/..." 
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Source Description</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="Describe the content..." 
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (Comma separated)</Label>
                  <Input 
                    id="keywords" 
                    placeholder="viral, funny, gaming..." 
                    value={formData.keywords}
                    onChange={e => setFormData({...formData, keywords: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-primary/20 glow-primary/10 h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Viral Optimizer
                  </CardTitle>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 text-primary border-primary/50 hover:bg-primary/10"
                    onClick={handleGenerateHooks}
                    disabled={generating}
                  >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    Optimize
                  </Button>
                </div>
                <CardDescription>AI-generated hooks to maximize click-through rate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div className="space-y-2">
                  <Label className="text-primary font-bold">Optimized Viral Title</Label>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 min-h-[60px] text-lg font-headline font-bold">
                    {formData.viralTitle || <span className="text-muted/50 italic font-body text-sm font-normal">Title optimized for heat will appear here...</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-primary font-bold">Catchy Viral Summary</Label>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 min-h-[120px] text-muted-foreground leading-relaxed">
                    {formData.viralSummary || <span className="text-muted/50 italic text-sm">A compelling summary for virality will appear here...</span>}
                  </div>
                </div>
                
                <div className="pt-8 mt-auto">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold glow-primary transition-all hover:scale-[1.02]"
                    disabled={loading || !formData.url}
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-6 h-6 mr-2" />
                        Deploy to Trending
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
}
