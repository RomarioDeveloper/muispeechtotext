import SpeechDashboard from './components/SpeechDashboard';
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        <div className="mb-8 sm:mb-12 text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            AI Speech Tools
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Transform text to speech and transcribe your voice with our modern, AI-powered tools.
          </p>
        </div>
        
        <SpeechDashboard />
      </div>
      <Toaster />
    </div>
  );
}
