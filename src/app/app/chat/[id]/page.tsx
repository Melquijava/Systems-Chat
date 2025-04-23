"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, SendHorizontal, Image, Paperclip, Smile } from "lucide-react";
import Link from "next/link";
import type { Message, User } from "@/types";
import { getMessagesBetweenUsers, getUserById, mockMessages } from "@/lib/mock-data";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [chatPartner, setChatPartner] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para rolar para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Carregar dados do chat
  useEffect(() => {
    const fetchChatData = async () => {
      setLoading(true);
      try {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 500));

        // Obter o parceiro de chat pelos dados mockados
        const partner = getUserById(id);
        if (!partner) {
          toast.error("Usuário não encontrado");
          router.push("/app/chat");
          return;
        }

        setChatPartner(partner);

        // Carregar mensagens entre os usuários
        const currentUserId = "1"; // Ana Silva
        const chatMessages = getMessagesBetweenUsers(currentUserId, id);

        // Marcar mensagens como lidas
        const updatedMessages = chatMessages.map(msg =>
          msg.receiverId === currentUserId && !msg.read
            ? { ...msg, read: true }
            : msg
        );

        setMessages(updatedMessages);
      } catch (error) {
        console.error("Erro ao carregar chat:", error);
        toast.error("Erro ao carregar conversa");
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [id, router]);

  // Rolar para o final quando as mensagens mudarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar nova mensagem
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // Criar nova mensagem
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "1", // Usuário atual (Ana Silva)
      receiverId: id,
      content: newMessage,
      read: false,
      createdAt: new Date()
    };

    // Adicionar à lista de mensagens
    setMessages(prevMessages => [...prevMessages, newMsg]);

    // Limpar campo de entrada
    setNewMessage("");

    // Simular resposta automática do parceiro após 1-3 segundos
    const shouldReply = Math.random() > 0.3; // 70% de chance de resposta

    if (shouldReply && chatPartner) {
      const replyDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 segundos

      setTimeout(() => {
        const replyMessages = [
          `Olá, tudo bem? Gostei do seu perfil!`,
          `Quais são seus interesses?`,
          `Você vai à próxima festa da faculdade?`,
          `Estou curtindo seu papo!`,
          `Qual curso você faz mesmo?`,
          `Haha, muito legal!`,
          `Concordo com você!`,
          `Vamos marcar algo na IESGO qualquer dia desses?`
        ];

        const replyMsg: Message = {
          id: `msg-${Date.now()}`,
          senderId: id,
          receiverId: "1", // Usuário atual (Ana Silva)
          content: replyMessages[Math.floor(Math.random() * replyMessages.length)],
          read: true,
          createdAt: new Date()
        };

        setMessages(prevMessages => [...prevMessages, replyMsg]);
      }, replyDelay);
    }
  };

  // Formatar data da mensagem
  const formatMessageTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-500">Carregando conversa...</p>
      </div>
    );
  }

  if (!chatPartner) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Usuário não encontrado</h1>
        <p className="text-gray-500 mb-6">Não foi possível carregar esta conversa.</p>
        <Button asChild>
          <Link href="/app/chat">Voltar para mensagens</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-3 shadow-sm flex items-center border-b">
        <Link href="/app/chat">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10 mr-3">
          {chatPartner.photos && chatPartner.photos.length > 0 ? (
            <AvatarImage src={chatPartner.photos[0]} alt={chatPartner.name} />
          ) : (
            <AvatarFallback>{chatPartner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold">{chatPartner.name}</h2>
          <p className="text-xs text-green-600">Online agora</p>
        </div>
        <Link href={`/app/profile/${chatPartner.id}`}>
          <Button variant="ghost" size="sm">Ver perfil</Button>
        </Link>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 h-[calc(100vh-8rem)]">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <SendHorizontal className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">Sem mensagens ainda</h3>
              <p className="text-gray-500 text-sm">
                Envie uma mensagem para iniciar a conversa com {chatPartner.name}
              </p>
            </div>
          ) : (
            <>
              {/* Data de início */}
              <div className="text-center my-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              {/* Mensagens */}
              {messages.map((message) => {
                const isSender = message.senderId === "1";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        isSender
                          ? "bg-[#6C63FF] text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          isSender ? "text-white/70 text-right" : "text-gray-500"
                        }`}
                      >
                        {formatMessageTime(message.createdAt)}
                        {isSender && (
                          <span className="ml-1">
                            {message.read ? "✓✓" : "✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Referência para rolar até o final */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Área de input */}
      <div className="bg-white p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="relative flex-1">
            <Input
              placeholder="Digite uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="pr-10 py-6"
            />
            <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Smile className="h-5 w-5" />
            </Button>
          </div>

          <Button
            type="submit"
            size="icon"
            className="bg-[#FF6B8B] hover:bg-[#E06078] h-10 w-10 rounded-full"
            disabled={!newMessage.trim()}
          >
            <SendHorizontal className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}
