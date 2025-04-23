"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/cards/ProfileCard";
import { allUsers, mockUsers } from "@/lib/mock-data";
import type { User } from "@/types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MatchDialog from "@/components/cards/MatchDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [swipedUsers, setSwipedUsers] = useState<string[]>([]);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  // Inicializa os usuários
  useEffect(() => {
    // Aqui poderia ser uma chamada API, mas por enquanto usamos dados mockados
    const shuffledUsers = [...allUsers].sort(() => 0.5 - Math.random());
    setUsers(shuffledUsers);
  }, []);

  // Função para lidar com o swipe para a esquerda (rejeitar)
  const handleSwipeLeft = (userId: string) => {
    // Se não houver mais usuários para mostrar
    if (currentIndex === users.length - 1) {
      toast.info("Acabaram os perfis por hoje! Volte mais tarde.");
      return;
    }

    toast.info("Perfil passado!");
    setSwipedUsers((prev) => [...prev, userId]);
    setCurrentIndex((prev) => prev + 1);
  };

  // Função para lidar com o swipe para a direita (curtir)
  const handleSwipeRight = (userId: string) => {
    // Se não houver mais usuários para mostrar
    if (currentIndex === users.length - 1) {
      toast.info("Acabaram os perfis por hoje! Volte mais tarde.");
      return;
    }

    // Adicionar à lista de curtidos
    setLikedUsers((prev) => [...prev, userId]);
    setSwipedUsers((prev) => [...prev, userId]);

    // Simular uma chance aleatória de match (no mundo real, isso seria verificado no servidor)
    const isMatch = Math.random() > 0.7; // 30% de chance de match
    if (isMatch) {
      setMatchedUser(users[currentIndex]);
      setShowMatchDialog(true);
    } else {
      toast.success("Você curtiu esse perfil!");
    }

    // Avançar para o próximo perfil
    setCurrentIndex((prev) => prev + 1);
  };

  // Função para mostrar mais detalhes do perfil
  const handleInfoClick = (userId: string) => {
    toast.info("Funcionalidade em desenvolvimento!");
  };

  // Quando ocorre um match
  const handleMatchDialogClose = () => {
    setShowMatchDialog(false);
    setMatchedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Link href="/app/profile">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Button>
        </Link>

        <div className="flex items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B8B" />
                <stop offset="1" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="text-xl font-bold text-transparent bg-clip-text match-gradient ml-2">
            Match IESGO
          </h1>
        </div>

        <Link href="/app/matches">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Button>
        </Link>
      </header>

      {/* Área principal de swipe */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {users.length > 0 && currentIndex < users.length ? (
          <ProfileCard
            key={users[currentIndex].id}
            user={users[currentIndex]}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onInfoClick={handleInfoClick}
            className="z-10"
          />
        ) : (
          <div className="text-center p-8 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Não há mais perfis disponíveis</h2>
            <p className="text-muted-foreground mb-6">
              Volte mais tarde para encontrar novas pessoas na IESGO!
            </p>
            <Button
              className="match-gradient text-white"
              onClick={() => {
                setCurrentIndex(0);
                setSwipedUsers([]);
                const shuffledUsers = [...allUsers].sort(() => 0.5 - Math.random());
                setUsers(shuffledUsers);
              }}
            >
              Reiniciar Swipes
            </Button>
          </div>
        )}
      </div>

      {/* Botões de navegação no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 flex justify-around items-center">
        <Link href="/app">
          <Button variant="ghost" size="icon" className="text-violet-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Button>
        </Link>

        <Link href="/app/explore">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button>
        </Link>

        <Link href="/app/matches">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Button>
        </Link>

        <Link href="/app/profile">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Button>
        </Link>
      </div>

      {/* Dialog para quando ocorre um match */}
      {showMatchDialog && matchedUser && (
        <Dialog open={showMatchDialog} onOpenChange={handleMatchDialogClose}>
          <DialogContent className="bg-gradient-to-r from-[#FF6B8B] to-[#6C63FF] text-white border-none sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Deu Match!
              </DialogTitle>
              <DialogDescription className="text-white text-center opacity-90">
                Você e {matchedUser.name} curtiram um ao outro!
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white relative -mr-6 z-10">
                  {users[currentIndex-1]?.photos[0] && (
                    <img
                      src={users[currentIndex-1].photos[0]}
                      alt="Seu perfil"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white relative">
                  {matchedUser.photos[0] && (
                    <img
                      src={matchedUser.photos[0]}
                      alt={matchedUser.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </div>

              <Button
                className="bg-white text-[#6C63FF] hover:bg-white/90 font-semibold px-8 py-2"
                onClick={() => {
                  handleMatchDialogClose();
                  // Aqui redirecionaria para o chat
                }}
              >
                Enviar Mensagem
              </Button>

              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 mt-2"
                onClick={handleMatchDialogClose}
              >
                Continuar Rolando
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
