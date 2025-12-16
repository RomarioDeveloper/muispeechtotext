import TextToSpeech from './components/TextToSpeech';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8 sm:mb-12 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Text to Speech
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Transform any text into natural-sounding speech
          </p>
        </div>
        
        <TextToSpeech />
      </div>
    </div>
  );
}
