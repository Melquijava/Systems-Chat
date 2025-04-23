// Tipo de interesses/hobbies que um usuário pode ter
export type InterestCategory =
  | "esportes"
  | "música"
  | "filmes"
  | "jogos"
  | "livros"
  | "viagens"
  | "culinária"
  | "arte"
  | "tecnologia"
  | "festas"
  | "estudo";

// Tipo para representar o que o usuário está buscando no app
export type LookingFor = "relacionamento" | "amizade" | "ambos";

// Tipo para representar o curso do usuário
export type Course =
  | "Direito"
  | "Administração"
  | "Enfermagem"
  | "Ciências Contábeis"
  | "Engenharia Civil"
  | "Pedagogia"
  | "Odontologia"
  | "Farmácia"
  | "Psicologia"
  | "Fisioterapia"
  | "Outro";

// Modelo de usuário
export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  course: Course;
  bio: string;
  photos: string[];
  interests: InterestCategory[];
  lookingFor: LookingFor;
  semester: number; // semestre do curso
  createdAt: Date;
  updatedAt: Date;
}

// Modelo de mensagem (para chat)
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

// Modelo de match entre usuários
export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  createdAt: Date;
}

// Tipo para representar a direção do swipe
export type SwipeDirection = "left" | "right" | "up" | "down";

// Tipo para representar o estado de um perfil visualizado
export interface ProfileView {
  userId: string;
  swiped: boolean;
  direction?: SwipeDirection;
  timestamp: Date;
}
