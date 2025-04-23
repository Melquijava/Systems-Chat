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
import type { Course } from "@/types"; // Certifique-se que este tipo existe ou ajuste conforme necessário

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState<Course>("Direito"); // Ajuste o valor inicial se necessário
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Adapte a lista de cursos conforme necessário
  const courses: Course[] = [
    "Direito","Administração", "Enfermagem", "Ciências Contábeis",
    "Engenharia Civil", "Pedagogia", "Odontologia", "Farmácia",
    "Psicologia", "Fisioterapia", "Outro" 
  ];

  const handleNextStep = (e: React.FormEvent) => { // Adicionado parâmetro 'e' e tipo
    e.preventDefault(); // Prevenir envio do formulário ao clicar em "Continuar"
    if (step === 1) {
      // Validação básica
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }

      // --- REMOVIDO O BLOCO DE VERIFICAÇÃO DE E-MAIL ACADÊMICO ---
      // // Verificação de e-mail acadêmico
      // if (!email.endsWith("@iesgo.edu.br")) { // <-- Linha removida
      //   toast.error("Por favor, use seu e-mail acadêmico (@iesgo.edu.br)."); // <-- Linha removida
      //   return; // <-- Linha removida
      // } // <-- Linha removida
      // --- FIM DA REMOÇÃO ---

      // Verificação de senha
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }

      // Avança para a próxima etapa
      setStep(2);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica da segunda etapa
    if (!age || !course) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // Verificação de idade
    const ageNumber = Number.parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 17 || ageNumber > 70) {
      toast.error("Por favor, digite uma idade válida (17-70 anos).");
      return;
    }

    setIsLoading(true);

    try {
      // Simula um registro
      console.log("Registrando com:", { name, email, password, age, course }); // Log para depuração
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Em um app real, aqui faríamos uma chamada API para /api/register por exemplo
      // const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password, age, course }) });
      // if (!response.ok) throw new Error('Falha no registro');

      // Simulação de registro bem-sucedido
      localStorage.setItem("isLoggedIn", "true"); // Apenas para simulação

      toast.success("Conta criada com sucesso!");
      router.push("/app"); // Redireciona para a página principal do app
    } catch (error) {
      console.error("Erro no registro:", error); // Log do erro
      toast.error("Erro ao criar conta. Tente novamente.");
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
          <CardTitle className="text-2xl font-bold text-center">Crie sua conta</CardTitle>
          <CardDescription className="text-center">
            {step === 1
              ? "Preencha seus dados para criar uma conta no Match IESGO"
              : "Mais algumas informações para finalizar seu cadastro"}
          </CardDescription>
        </CardHeader>

        {/* Usando onSubmit no form e type="button" ou type="submit" nos botões */}
        <form onSubmit={step === 1 ? handleNextStep : handleRegister}>
          <CardContent className="space-y-4">
            {step === 1 ? (
              // Step 1: Informações básicas
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome Completo
                  </label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirme a Senha
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              // Step 2: Informações adicionais
              <>
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium">
                    Idade
                  </label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Sua idade"
                    min={17}
                    max={70}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="course" className="text-sm font-medium">
                    Curso
                  </label>
                  <select
                    id="course"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={course}
                    onChange={(e) => setCourse(e.target.value as Course)}
                    required
                  >
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    Ao cadastrar-se, você concorda com nossos <Link href="/terms" className="text-violet-600 hover:text-violet-700">Termos de Uso</Link> e <Link href="/privacy" className="text-violet-600 hover:text-violet-700">Política de Privacidade</Link>.
                  </p>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            {step === 1 ? (
              // Botão Continuar agora é do tipo submit para acionar o onSubmit do form
              <Button className="w-full match-gradient text-white" type="submit">
                Continuar
              </Button>
            ) : (
              <>
                {/* Botão Criar Conta é do tipo submit */}
                <Button className="w-full match-gradient text-white" type="submit" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
                {/* Botão Voltar deve ser type="button" para não submeter o form */}
                <Button variant="ghost" className="mt-2" type="button" onClick={() => setStep(1)}>
                  Voltar
                </Button>
              </>
            )}

            <p className="mt-4 text-sm text-center text-gray-500">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-violet-600 hover:text-violet-700">
                Entre aqui
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}