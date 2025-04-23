import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { User, InterestCategory } from "@/types";
import { useSwipeable } from "react-swipeable";
import { X, Heart, Info, MessageCircle } from "lucide-react";

interface ProfileCardProps {
  user: User;
  onSwipeLeft: (userId: string) => void;
  onSwipeRight: (userId: string) => void;
  onInfoClick?: (userId: string) => void;
  className?: string;
}

export default function ProfileCard({
  user,
  onSwipeLeft,
  onSwipeRight,
  onInfoClick,
  className = ""
}: ProfileCardProps) {
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

  // Configuração para detectar swipes
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(user.id),
    onSwipedRight: () => onSwipeRight(user.id),
    trackMouse: true
  });

  return (
    <Card
      className={`swipe-card relative overflow-hidden max-w-sm mx-auto ${className}`}
      {...handlers}
    >
      <div className="relative h-[400px] overflow-hidden">
        {user.photos && user.photos.length > 0 ? (
          <Image
            src={user.photos[0]}
            alt={`Foto de ${user.name}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">Sem foto</span>
          </div>
        )}

        {/* Overlay gradiente na parte inferior para melhor legibilidade do texto */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Informações básicas do perfil */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold">{user.name}, {user.age}</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full mx-2"></div>
            <p className="text-sm">{user.course}</p>
          </div>

          <p className="text-sm text-white/80 mt-1 line-clamp-2">{user.bio}</p>
        </div>
      </div>

      <CardContent className="p-4 pt-3">
        <div className="flex flex-wrap gap-2 mt-1">
          {user.interests.map((interest) => (
            <Badge key={interest} variant="outline" className="bg-violet-50">
              {interestEmojis[interest]} {interest}
            </Badge>
          ))}
        </div>

        <div className="mt-3 flex items-center text-sm text-muted-foreground">
          <span className="flex items-center">
            {user.lookingFor === "relacionamento" && "Buscando um relacionamento"}
            {user.lookingFor === "amizade" && "Buscando amizade"}
            {user.lookingFor === "ambos" && "Aberto a amizade ou relacionamento"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-3 pt-0">
        <Button
          onClick={() => onSwipeLeft(user.id)}
          size="icon"
          className="rounded-full pass-button h-14 w-14"
        >
          <X className="h-6 w-6" />
        </Button>

        {onInfoClick && (
          <Button
            onClick={() => onInfoClick(user.id)}
            size="icon"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-12 w-12"
          >
            <Info className="h-5 w-5" />
          </Button>
        )}

        <Button
          onClick={() => onSwipeRight(user.id)}
          size="icon"
          className="rounded-full like-button h-14 w-14"
        >
          <Heart className="h-6 w-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
