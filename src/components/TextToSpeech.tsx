import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello! This is a modern text-to-speech interface. Type any text here and listen to it come alive.');
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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
    <div className="w-full max-w-3xl mx-auto">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something to hear it spoken..."
            className="min-h-[200px] resize-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Speed</span>
              <span className="font-medium">{rate.toFixed(1)}x</span>
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
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Volume</span>
              <span className="font-medium">{Math.round(volume * 100)}%</span>
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

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSpeak}
            disabled={isSpeaking && !isPaused}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            {isPaused ? 'Resume' : 'Play'}
          </Button>

          <Button
            onClick={handlePause}
            disabled={!isSpeaking}
            variant="outline"
            className="flex-1"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>

          <Button
            onClick={handleStop}
            disabled={!isSpeaking && !isPaused}
            variant="outline"
            size="icon"
          >
            <Square className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
