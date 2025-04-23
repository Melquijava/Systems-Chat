"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";
import { getMatchedUsers, mockUsers, getMessagesBetweenUsers } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ChatListPage() {
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Carregar dados dos matches
  useEffect(() => {
    // Simula carregamento de dados (em um app real, isso viria de uma API)
    const fetchMatches = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Usar o primeiro usuário como o usuário logado para obter seus matches
        const currentUserId = "1"; // ID do usuário atual (Ana Silva nos dados mockados)
        const matchedUsers = getMatchedUsers(currentUserId);
        setMatches(matchedUsers);
      } catch (error) {
        console.error("Erro ao carregar matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Filtrar matches com base na pesquisa
  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Verificar se tem mensagens recentes
  const hasUnreadMessages = (userId: string) => {
    const messages = getMessagesBetweenUsers("1", userId);
    return messages.some(msg => msg.receiverId === "1" && !msg.read);
  };

  // Obter a última mensagem trocada com um usuário
  const getLastMessage = (userId: string) => {
    const messages = getMessagesBetweenUsers("1", userId);
    if (messages.length === 0) return null;

    return messages[messages.length - 1];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-500">Carregando conversas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center">Mensagens</h1>
      </div>

      {/* Barra de pesquisa */}
      <div className="bg-white p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar nas conversas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de conversas */}
      <div className="p-4">
        {filteredMatches.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-16 w-16 text-gray-300"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? "Nenhuma conversa encontrada" : "Sem conversas ainda"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Tente outro termo de pesquisa"
                : "Inicie uma conversa com seus matches para começar a interagir!"}
            </p>
            {!searchQuery && (
              <Button
                className="match-gradient text-white"
                asChild
              >
                <Link href="/app/matches">Ver Matches</Link>
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredMatches.map((match) => {
              const lastMessage = getLastMessage(match.id);
              const hasUnread = hasUnreadMessages(match.id);

              return (
                <Link href={`/app/chat/${match.id}`} key={match.id}>
                  <Card className="overflow-hidden hover:bg-gray-50 transition-colors">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className="relative">
                          <Avatar className="h-14 w-14 mr-4">
                            {match.photos && match.photos.length > 0 ? (
                              <AvatarImage src={match.photos[0]} alt={match.name} />
                            ) : (
                              <AvatarFallback>{match.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            )}
                          </Avatar>
                          <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{match.name}</h3>
                            <span className="text-xs text-gray-400">
                              {lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className={`text-sm ${hasUnread ? "font-semibold text-black" : "text-gray-500"} truncate w-48`}>
                              {lastMessage
                                ? lastMessage.content.length > 40
                                  ? `${lastMessage.content.substring(0, 40)}...`
                                  : lastMessage.content
                                : "Clique para iniciar uma conversa..."}
                            </p>
                            {hasUnread && (
                              <span className="w-5 h-5 rounded-full bg-[#FF6B8B] text-white text-xs flex items-center justify-center">
                                1
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
