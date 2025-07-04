'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { alumniChat } from '@/ai/flows/alumni-chat-flow';
import { Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatDialogProps {
  opportunityTitle: string;
  opportunityCompany: string;
  opportunityDescription: string;
  children: React.ReactNode;
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatDialog({ opportunityTitle, opportunityCompany, opportunityDescription, children }: ChatDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await alumniChat({
        opportunityTitle,
        opportunityCompany,
        opportunityDescription,
        chatHistory: [...messages, userMessage],
      });
      const aiMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isOpen && !isInitialMessageSent) {
      const initialMessage: Message = { role: 'model', content: `Hello! I'm an AI simulating a former '${opportunityTitle}' at ${opportunityCompany}. I'm happy to answer any questions you have about my (simulated) experience. What's on your mind?`};
      setMessages([initialMessage]);
      setIsInitialMessageSent(true);
    }
    if (!isOpen) {
        setMessages([]);
        setIsInitialMessageSent(false);
    }
  }, [isOpen, isInitialMessageSent, opportunityTitle, opportunityCompany]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Chat about: {opportunityTitle}</DialogTitle>
          <DialogDescription>
            Get insights from an AI simulating an alumnus from {opportunityCompany}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                    <div key={index} className={cn(
                        "flex items-start gap-3 w-full",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}>
                        {message.role === 'model' && (
                            <Avatar className="w-8 h-8 border">
                                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="alumni avatar" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "p-3 rounded-lg max-w-[80%]",
                            message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        )}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                         {message.role === 'user' && (
                            <Avatar className="w-8 h-8 border">
                                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
                                <AvatarFallback>Y</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                         <Avatar className="w-8 h-8 border">
                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="alumni avatar" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
        <DialogFooter className="bg-background border-t p-4 mt-0">
            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
