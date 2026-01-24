import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo! Saya adalah asisten AI Dinas Pariwisata. Ada yang bisa saya bantu terkait data pariwisata, laporan, atau rekomendasi?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Saya dapat membantu Anda menganalisis data kunjungan wisatawan bulan ini. Berdasarkan tren, ada peningkatan 15% dibandingkan bulan lalu.",
        "Tentu, saya bisa membuatkan draft laporan untuk kegiatan promosi wisata di Puncak.",
        "Objek wisata 'Curug Cilember' mendapatkan rating tinggi minggu ini. Apakah Anda ingin melihat detail ulasannya?",
        "Data akomodasi telah diperbarui. Ada 3 hotel baru yang terdaftar di sistem.",
        "Baik, saya akan mencatat hal tersebut. Apakah ada hal lain yang perlu saya bantu?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">Diskusikan data dan laporan dengan asisten cerdas.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-2 border-primary/10 shadow-lg">
        <CardHeader className="border-b bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Virtual Assistant
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">Online</span>
              </CardTitle>
              <CardDescription>Powered by Tourism Data Intelligence</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
            <div className="flex flex-col gap-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className={`h-10 w-10 border ${message.role === 'assistant' ? 'bg-primary/5' : 'bg-secondary'}`}>
                    {message.role === "assistant" ? (
                      <div className="h-full w-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <div className={`flex flex-col gap-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {message.role === "assistant" ? "Assistant" : user?.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div
                      className={`rounded-2xl px-5 py-3 text-sm shadow-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-white border border-border text-foreground rounded-tl-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/5 border border-border flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                   </div>
                   <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                     <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative flex items-center gap-2">
            <Input
              placeholder="Ketik pesan Anda di sini..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-12 py-6 rounded-full shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20"
              disabled={isTyping}
            />
            <Button 
              size="icon" 
              className="absolute right-1.5 h-9 w-9 rounded-full shadow-sm" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-center">
             <p className="text-[10px] text-muted-foreground">
               AI dapat membuat kesalahan. Mohon verifikasi informasi penting.
             </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
