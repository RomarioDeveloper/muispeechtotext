import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square, Paperclip, Settings2, X, Upload, FileText, Mic } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "text/plain" || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setText(content);
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a .txt file");
      }
    }
  };

  const handleSpeak = () => {
    if (!text) return;

    const synth = window.speechSynthesis;

    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <Card className="flex flex-col h-[600px] border-none shadow-xl bg-background overflow-hidden relative">
      <div className="flex items-center justify-between p-4 border-b bg-muted/20 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
           {text ? (
             <span className="flex items-center gap-2">
               <FileText className="w-4 h-4" />
               {text.length} characters
             </span>
           ) : (
             <span className="flex items-center gap-2">
               <Mic className="w-4 h-4" />
               AI Voice Reader
             </span>
           )}
        </div>
        
        <div className="flex items-center gap-2">
          {text && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setText('');
                handleStop();
              }}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 mr-4 space-y-4" align="end">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Speed</Label>
                    <span className="text-xs text-muted-foreground">{rate.toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Volume</Label>
                    <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
                  </div>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {!text ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
              <Upload className="w-8 h-8 opacity-50" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Upload text to begin</h3>
              <p className="text-sm max-w-xs mx-auto">
                Upload a .txt file or type directly in the chat bar below to convert text to speech.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Select File
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
               <FileText className="w-4 h-4 text-primary-foreground" />
             </div>
             <div className="space-y-2 flex-1">
               <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-6 rounded-2xl rounded-tl-none">
                 <p className="whitespace-pre-wrap leading-relaxed text-base">{text}</p>
               </div>
               <div className="flex items-center gap-2">
                 <Button
                    size="sm"
                    variant={isSpeaking ? "default" : "secondary"}
                    onClick={isSpeaking && !isPaused ? handlePause : handleSpeak}
                    className="rounded-full px-4 h-8 transition-all"
                 >
                   {isSpeaking && !isPaused ? (
                     <>
                       <Pause className="w-3 h-3 mr-2" /> Pause
                     </>
                   ) : (
                     <>
                       <Play className="w-3 h-3 mr-2" /> {isPaused ? 'Resume' : 'Read Aloud'}
                     </>
                   )}
                 </Button>
                 
                 {(isSpeaking || isPaused) && (
                   <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleStop}
                      className="rounded-full w-8 h-8 p-0"
                   >
                     <Square className="w-3 h-3" />
                   </Button>
                 )}
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-background border-t">
        <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-muted/50 p-2 rounded-2xl border focus-within:ring-1 focus-within:ring-ring transition-all">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt"
            className="hidden"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message or upload a file..."
            className="min-h-[44px] max-h-[200px] w-full resize-none border-none bg-transparent focus-visible:ring-0 px-2 py-3 text-base shadow-none"
            rows={1}
          />

          <Button
            size="icon"
            className={`h-10 w-10 shrink-0 rounded-xl transition-all ${isSpeaking && !isPaused ? 'bg-destructive hover:bg-destructive/90' : ''}`}
            onClick={isSpeaking && !isPaused ? handlePause : handleSpeak}
            disabled={!text}
          >
            {isSpeaking && !isPaused ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-1" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
