"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import type { User, InterestCategory, LookingFor } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carregar dados do usuário
  useEffect(() => {
    // Simula carregamento de dados (em um app real, isso viria de uma API)
    const fetchUser = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Usar o primeiro usuário dos dados mockados
        setUser(mockUsers[0]);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar seu perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Converter as categorias de interesse em um mapa de ícones/emojis
  const interestEmojis: Record<InterestCategory, string> = {
    esportes: "⚽",
    música: "🎵",
    filmes: "🎬",
    jogos: "🎮",
    livros: "📚",
    viagens: "✈️",
    culinária: "🍳",
    arte: "🎨",
    tecnologia: "💻",
    festas: "🎉",
    estudo: "📝"
  };

  // Mapear o lookingFor para um texto descritivo
  const lookingForText: Record<LookingFor, string> = {
    relacionamento: "Buscando relacionamento",
    amizade: "Buscando amizade",
    ambos: "Aberto a amizade ou relacionamento"
  };

  const handleLogout = () => {
    // Em um app real, isso seria uma chamada à API para logout
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout realizado com sucesso");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-500">Carregando seu perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Perfil não encontrado</h1>
        <p className="text-gray-500 mb-6">Não foi possível carregar seu perfil.</p>
        <Button onClick={() => router.push("/")}>Voltar para o início</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-bold">Seu Perfil</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          Sair
        </Button>
      </div>

      {/* Perfil do usuário */}
      <div className="p-4 max-w-lg mx-auto">
        <Card className="overflow-hidden mb-6">
          {/* Banner e foto de perfil */}
          <div className="h-32 bg-gradient-to-r from-[#FF6B8B] to-[#6C63FF] relative">
            <div className="absolute -bottom-12 left-4">
              <Avatar className="h-24 w-24 border-4 border-white">
                {user.photos && user.photos.length > 0 ? (
                  <AvatarImage src={user.photos[0]} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>

          <CardContent className="pt-14 pb-4">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  {user.name}, {user.age}
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 ml-2 rounded-full">
                    Online
                  </span>
                </h2>
                <p className="text-gray-500">{user.course} • {user.semester}º semestre</p>
              </div>

              <p className="text-gray-700">{user.bio}</p>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Interesses</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="bg-violet-50">
                      {interestEmojis[interest]} {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Buscando</h3>
                <p className="text-gray-700">{lookingForText[user.lookingFor]}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button
                className="w-full match-gradient text-white"
                asChild
              >
                <Link href="/app/profile/edit">Editar Perfil</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Configurações</h3>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                asChild
              >
                <Link href="/app/profile/preferences">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preferências de descoberta
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                asChild
              >
                <Link href="/app/profile/notifications">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  Notificações
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                asChild
              >
                <Link href="/app/profile/privacy">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Privacidade e segurança
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                Sair
              </Button>
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
              <p>Match IESGO v1.0.0</p>
              <p className="mt-1">
                <Link href="/terms" className="hover:underline">Termos de Uso</Link>
                {" • "}
                <Link href="/privacy" className="hover:underline">Política de Privacidade</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
