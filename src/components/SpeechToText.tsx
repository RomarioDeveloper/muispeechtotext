import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSpeechToText } from '@/hooks/use-speech-to-text';
import { Mic, MicOff, Copy, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SpeechToText() {
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechToText();

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    toast.success('Text copied to clipboard');
  };

  return (
    <Card className="p-6 space-y-6 border-none shadow-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={isListening ? "destructive" : "secondary"} className="h-6">
            {isListening ? (
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Recording
              </span>
            ) : (
              "Ready"
            )}
          </Badge>
        </div>
        
        <TooltipProvider>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!transcript}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy text</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={resetTranscript} disabled={!transcript}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear text</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="relative">
        <Textarea
          value={transcript}
          readOnly
          placeholder="Click the microphone to start speaking..."
          className="min-h-[300px] resize-none text-lg leading-relaxed p-6 focus-visible:ring-0 border-muted bg-muted/30"
        />
        
        {!transcript && !isListening && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
            <p className="text-sm text-muted-foreground">Press the microphone button below</p>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
    </Card>
  );
}

