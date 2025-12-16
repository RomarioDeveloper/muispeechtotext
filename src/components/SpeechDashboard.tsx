import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TextToSpeech from "./TextToSpeech"
import SpeechToText from "./SpeechToText"
import { Card } from "@/components/ui/card"
import { Mic, Volume2 } from "lucide-react"

export default function SpeechDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Tabs defaultValue="tts" className="w-full space-y-8">
        <div className="flex justify-center">
          <Card className="p-1 bg-muted/50 border-none shadow-sm backdrop-blur-sm w-fit rounded-full">
            <TabsList className="grid w-[400px] grid-cols-2 rounded-full h-12 p-0 bg-transparent">
              <TabsTrigger value="tts" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 h-full">
                <Volume2 className="w-4 h-4 mr-2" />
                Text to Speech
              </TabsTrigger>
              <TabsTrigger value="stt" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 h-full">
                <Mic className="w-4 h-4 mr-2" />
                Speech to Text
              </TabsTrigger>
            </TabsList>
          </Card>
        </div>
        
        <div className="w-full">
          <TabsContent value="tts" className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <TextToSpeech />
          </TabsContent>
          
          <TabsContent value="stt" className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <SpeechToText />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
