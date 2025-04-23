"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // --- REMOVIDO O BLOCO DE VERIFICAÇÃO DE E-MAIL ---
    // // Verificação de e-mail acadêmico
    // if (!email.endsWith("@gmail.com")) { // <-- Linhas removidas
    //   toast.error("Por favor, use seu e-mail acadêmico (@gmail.com)."); // <-- Linhas removidas
    //   return; // <-- Linhas removidas
    // } // <-- Linhas removidas
    // --- FIM DA REMOÇÃO ---

    setIsLoading(true);

    try {
      // Simula uma autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Em um app real, aqui faríamos uma chamada API
      // Simulação de login bem-sucedido
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login realizado com sucesso!");
      router.push("/app"); // Redireciona para a página principal do app
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {/* Ícone */}
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
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
          </div>
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo ao Match IESGO</CardTitle>
          {/* Texto Descritivo Atualizado */}
          <CardDescription className="text-center">
            Entre com seu e-mail e senha para continuar {/* Texto Atualizado */}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {/* Label Atualizada */}
              <label htmlFor="email" className="text-sm font-medium">
                E-mail {/* Texto Atualizado */}
              </label>
              {/* Placeholder Atualizado */}
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com" // Placeholder Atualizado
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-violet-600 hover:text-violet-700">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full match-gradient text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="mt-4 text-sm text-center text-gray-500">
              Não tem uma conta?{" "}
              <Link href="/auth/register" className="text-violet-600 hover:text-violet-700">
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}