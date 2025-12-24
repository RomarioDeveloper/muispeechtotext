import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useSpeechToText } from '@/hooks/use-speech-to-text';
import { Mic, MicOff, Copy, Trash2, Paperclip, Upload, AudioLines, Radio } from 'lucide-react';
import { toast } from 'sonner';

interface ExternalSpeechData {
  dateTimeStart: string;
  dateTimeEnd: string;
  text: string;
}

export default function SpeechToText() {
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechToText();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isExternalMode, setIsExternalMode] = useState(false);
  const [externalData, setExternalData] = useState<ExternalSpeechData[]>([]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [transcript]);

  useEffect(() => {
    if (isExternalMode && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [externalData, isExternalMode]);

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on('custom:speech-data', (data: ExternalSpeechData) => {
        setExternalData(prev => [...prev, data]);
        toast.success('New speech data received');
      });
    }
    
    return () => {
      if (import.meta.hot) {
        // cleanup if needed, though hot.off isn't always available or necessary for this usage
      }
    };
  }, []);

  const handleCopy = () => {
    if (isExternalMode) {
       const textToCopy = externalData.map(d => `${d.dateTimeStart} | ${d.dateTimeEnd}\n${d.text}`).join('\n\n');
       if (!textToCopy) return;
       navigator.clipboard.writeText(textToCopy);
       toast.success('All external speech data copied');
       return;
    }

    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    toast.success('Text copied to clipboard');
  };
  
  const handleClear = () => {
    if (isExternalMode) {
      setExternalData([]);
      toast.success('External data cleared');
    } else {
      resetTranscript();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        toast.info("Audio file selected: " + file.name);
        toast.warning("Note: Client-side file transcription requires a backend API (e.g., OpenAI Whisper). This is a UI demo for file upload.", {
          duration: 5000,
        });
      } else {
        toast.error("Please select an audio file (mp3, wav, etc.)");
      }
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-none shadow-xl bg-background overflow-hidden relative">
      <div className="flex items-center justify-between p-4 border-b bg-muted/20 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
           {isListening ? (
             <Badge variant="destructive" className="animate-pulse gap-1.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
               Recording...
             </Badge>
           ) : (
             <span className="flex items-center gap-2">
               <AudioLines className="w-4 h-4" />
               AI Transcriber
             </span>
           )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy}
            disabled={isExternalMode ? externalData.length === 0 : !transcript}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Copy className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClear}
            disabled={isExternalMode ? externalData.length === 0 : !transcript}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {isExternalMode ? (
          externalData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <Radio className="w-8 h-8 opacity-50" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">External Source Mode</h3>
                <p className="text-sm max-w-xs mx-auto">
                  Waiting for data from external applications or REST API...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
               {externalData.map((data, i) => (
                 <Card key={i} className="p-4 border-none shadow-sm bg-muted/30">
                   <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground border-b border-border/50 pb-2 mb-3">
                      <span className="font-mono">{data.dateTimeStart}</span>
                      <span className="text-muted-foreground/40">|</span>
                      <span className="font-mono">{data.dateTimeEnd}</span>
                   </div>
                   <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                     {data.text}
                   </p>
                 </Card>
               ))}
               <div ref={messagesEndRef} /> 
            </div>
          )
        ) : !transcript && !isListening ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
              <Upload className="w-8 h-8 opacity-50" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Start Speaking or Upload</h3>
              <p className="text-sm max-w-xs mx-auto">
                Click the microphone to record voice or upload an audio file to transcribe.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Select Audio File
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
               <AudioLines className="w-4 h-4 text-primary-foreground" />
             </div>
             <div className="space-y-2 flex-1">
               <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-6 rounded-2xl rounded-tl-none">
                 <p className="whitespace-pre-wrap leading-relaxed text-base">
                   {transcript || (isListening ? "Listening..." : "")}
                 </p>
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
            accept="audio/*"
            className="hidden"
          />

          {isExternalMode ? (
             <div className="flex-1 flex items-center justify-center py-2 text-sm text-muted-foreground gap-2 h-[44px]">
               <Radio className="w-4 h-4 animate-pulse text-primary" />
               Receiving data from external sources...
             </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground"
                onClick={() => fileInputRef.current?.click()}
                disabled={isListening}
              >
                {isListening ? (
                   <MicOff className="w-5 h-5 opacity-50" /> 
                ) : (
                   <Paperclip className="w-5 h-5" />
                )}
              </Button>

              <Textarea
                ref={textareaRef}
                value={transcript}
                readOnly
                placeholder={isListening ? "Listening to your voice..." : "Transcription will appear here..."}
                className="min-h-[44px] max-h-[200px] w-full resize-none border-none bg-transparent focus-visible:ring-0 px-2 py-3 text-base shadow-none"
                rows={1}
              />

              <Button
                size="icon"
                variant={isListening ? "destructive" : "default"}
                className={`h-10 w-10 shrink-0 rounded-xl transition-all ${isListening ? 'animate-pulse' : ''}`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
            </>
          )}

          <Button
            size="icon"
            variant={isExternalMode ? "default" : "ghost"}
            className={`h-10 w-10 shrink-0 rounded-xl transition-all ${isExternalMode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => {
                setIsExternalMode(!isExternalMode);
                if (isListening) stopListening();
            }}
            title="External Data Mode"
          >
            <Radio className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
