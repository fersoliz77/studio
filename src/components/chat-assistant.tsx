// src/components/chat-assistant.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';
import { chatWithPortfolioAssistant } from '@/app/chat/actions';
import { useTranslation } from 'react-i18next';
import { BeatLoader } from 'react-spinners';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatAssistantProps {
  lang: string;
}

export function ChatAssistant({ lang }: ChatAssistantProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([{
    role: 'model',
    content: t('chat.initialGreeting', { name: "Fer Soliz" })
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage: Message = { role: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyForAI = messages.slice(1); // Exclude initial greeting from history sent to AI
      const response = await chatWithPortfolioAssistant(
        newUserMessage.content,
        historyForAI,
        lang
      );
      const newAIMessage: Message = { role: 'model', content: response.response };
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    } catch (error) {
      console.error('Error chatting with AI assistant:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', content: t('chat.errorMessage') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-background shadow-md">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><FaRobot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-xl p-3 ${msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200 text-gray-800"><FaUser /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground"><FaRobot /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-xl rounded-bl-none p-3">
                <BeatLoader size={8} color="#a1a1aa" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="flex items-center p-4 border-t bg-card">
        <Input
          placeholder={t('chat.inputPlaceholder')}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 mr-2"
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          <FaPaperPlane className="mr-2" /> {t('chat.sendButton')}
        </Button>
      </div>
    </div>
  );
}
