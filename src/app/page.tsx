import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FF6B8B] to-[#6C63FF] p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-2">Match IESGO</h1>
          <p className="text-white/80 text-lg">
            Conecte-se com outros estudantes da IESGO para relacionamentos e amizades
          </p>
        </div>

        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-24 h-24"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B8B" />
                <stop offset="100%" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-white hover:bg-white/90 text-[#6C63FF] hover:text-[#6C63FF]/90 h-12 text-lg font-semibold"
          >
            <Link href="/auth/login">Entrar</Link>
          </Button>
          <Button
            asChild
            className="w-full bg-transparent border-2 border-white hover:bg-white/10 text-white h-12 text-lg font-semibold"
          >
            <Link href="/auth/register">Criar Conta</Link>
          </Button>
        </div>

        <p className="text-white/70 text-sm mt-8">
          Exclusivo para estudantes da IESGO
        </p>
      </div>
    </div>
  );
}
