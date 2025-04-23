"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMatchedUsers, mockUsers } from "@/lib/mock-data";

export default function MatchesPage() {
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"matches" | "messages">("matches");
  const router = useRouter();

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
        toast.error("Erro ao carregar seus matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-500">Carregando seus matches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center">Seus Matches</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "matches"
                ? "text-[#FF6B8B] border-b-2 border-[#FF6B8B]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("matches")}
          >
            Matches
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "messages"
                ? "text-[#FF6B8B] border-b-2 border-[#FF6B8B]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Mensagens
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "matches" ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Novos Matches</h2>

            {matches.length === 0 ? (
              <Card className="bg-white p-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-300"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sem matches ainda</h3>
                <p className="text-gray-500 mb-6">
                  Continue rolando para encontrar pessoas compatíveis com você!
                </p>
                <Button
                  className="match-gradient text-white"
                  asChild
                >
                  <Link href="/app">Descobrir Pessoas</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {matches.map((match) => (
                  <Card key={match.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <Avatar className="h-16 w-16 mr-4">
                          {match.photos && match.photos.length > 0 ? (
                            <AvatarImage src={match.photos[0]} alt={match.name} />
                          ) : (
                            <AvatarFallback>{match.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{match.name}, {match.age}</h3>
                          <p className="text-sm text-gray-500">{match.course}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full h-10 w-10 p-0 flex items-center justify-center border-violet-200"
                            asChild
                          >
                            <Link href={`/app/profile/${match.id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-violet-500"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                              </svg>
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-[#FF6B8B] hover:bg-[#E06078]"
                            asChild
                          >
                            <Link href={`/app/chat/${match.id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-white"
                              >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                              </svg>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Mensagens</h2>

            {matches.length === 0 ? (
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
                <h3 className="text-xl font-semibold mb-2">Sem conversas ainda</h3>
                <p className="text-gray-500 mb-6">
                  Inicie uma conversa com seus matches para começar a interagir!
                </p>
                <Button
                  className="match-gradient text-white"
                  onClick={() => setActiveTab("matches")}
                >
                  Ver Matches
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {matches.map((match) => (
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
                            <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">{match.name}</h3>
                              <span className="text-xs text-gray-400">Agora</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500 truncate w-48">
                                {match.id === "4"
                                  ? "Oi Ana! Estou bem, e você? Gosto de vários..."
                                  : "Clique para iniciar uma conversa..."}
                              </p>
                              {match.id === "4" && (
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
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
