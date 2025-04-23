import React from "react";
import type { User } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MatchDialogProps {
  open: boolean;
  onClose: () => void;
  currentUser: User;
  matchedUser: User;
  onSendMessage: () => void;
}

export default function MatchDialog({
  open,
  onClose,
  currentUser,
  matchedUser,
  onSendMessage
}: MatchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
              {currentUser.photos && currentUser.photos.length > 0 && (
                <img
                  src={currentUser.photos[0]}
                  alt="Seu perfil"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white relative">
              {matchedUser.photos && matchedUser.photos.length > 0 && (
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
            onClick={onSendMessage}
          >
            Enviar Mensagem
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mt-2"
            onClick={onClose}
          >
            Continuar Rolando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
