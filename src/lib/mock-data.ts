import type { Course, InterestCategory, LookingFor, Match, Message, User } from "@/types";

// Função para criar um ID aleatório
const generateId = () => Math.random().toString(36).substring(2, 15);

// Função para criar uma data aleatória nos últimos 30 dias
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date;
};

// Função para gerar um array aleatório de interesses
const getRandomInterests = (): InterestCategory[] => {
  const allInterests: InterestCategory[] = [
    "esportes", "música", "filmes", "jogos", "livros",
    "viagens", "culinária", "arte", "tecnologia", "festas", "estudo"
  ];

  const shuffled = [...allInterests].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2); // 2-6 interesses
};

// Função para gerar um curso aleatório
const getRandomCourse = (): Course => {
  const courses: Course[] = [
    "Direito", "Administração", "Enfermagem", "Ciências Contábeis",
    "Engenharia Civil", "Pedagogia", "Odontologia", "Farmácia",
    "Psicologia", "Fisioterapia", "Outro"
  ];

  return courses[Math.floor(Math.random() * courses.length)];
};

// Função para gerar um semestre aleatório (1-10)
const getRandomSemester = (): number => Math.floor(Math.random() * 10) + 1;

// Função para gerar um objetivo aleatório (amizade, relacionamento ou ambos)
const getRandomLookingFor = (): LookingFor => {
  const options: LookingFor[] = ["amizade", "relacionamento", "ambos"];
  return options[Math.floor(Math.random() * options.length)];
};

// Usuários simulados
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    age: 21,
    email: "ana.silva@iesgo.edu.br",
    course: "Direito",
    bio: "Estudante de Direito apaixonada por cinema e música. Adoro debater sobre política e direitos humanos.",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["filmes", "música", "estudo"],
    lookingFor: "ambos",
    semester: 6,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-04-02")
  },
  {
    id: "2",
    name: "Pedro Mendes",
    age: 23,
    email: "pedro.mendes@iesgo.edu.br",
    course: "Engenharia Civil",
    bio: "Engenheiro em formação, apaixonado por tecnologia e esportes. Busco pessoas com quem possa conversar sobre inovação.",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["esportes", "tecnologia", "jogos"],
    lookingFor: "amizade",
    semester: 8,
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2024-03-15")
  },
  {
    id: "3",
    name: "Juliana Costa",
    age: 20,
    email: "juliana.costa@iesgo.edu.br",
    course: "Psicologia",
    bio: "Estudante de Psicologia, adoro ler e viajar. Procuro alguém que goste de explorar lugares novos e conversar sobre tudo.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["livros", "viagens", "arte"],
    lookingFor: "relacionamento",
    semester: 4,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-28")
  },
  {
    id: "4",
    name: "Lucas Oliveira",
    age: 22,
    email: "lucas.oliveira@iesgo.edu.br",
    course: "Administração",
    bio: "Administrador em formação, amo música e esportes. Buscando amizades e quem sabe algo mais na IESGO.",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["música", "esportes", "festas"],
    lookingFor: "ambos",
    semester: 5,
    createdAt: new Date("2023-10-10"),
    updatedAt: new Date("2024-02-20")
  },
  {
    id: "5",
    name: "Camila Rodrigues",
    age: 19,
    email: "camila.rodrigues@iesgo.edu.br",
    course: "Enfermagem",
    bio: "Estudante de enfermagem, apaixonada por ajudar pessoas. Amo cozinhar e assistir séries nos momentos livres.",
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["culinária", "filmes", "estudo"],
    lookingFor: "amizade",
    semester: 3,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-04-01")
  },
  {
    id: "6",
    name: "Rafael Santos",
    age: 24,
    email: "rafael.santos@iesgo.edu.br",
    course: "Ciências Contábeis",
    bio: "Quase contador, adoro jogos, tecnologia e festas universitárias. Procurando conhecer pessoas novas!",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["jogos", "tecnologia", "festas"],
    lookingFor: "ambos",
    semester: 7,
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2024-03-01")
  },
  {
    id: "7",
    name: "Mariana Lima",
    age: 20,
    email: "mariana.lima@iesgo.edu.br",
    course: "Pedagogia",
    bio: "Futura pedagoga, amo arte, literatura e trabalhos voluntários. Buscando pessoas com interesses similares.",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["arte", "livros", "estudo"],
    lookingFor: "relacionamento",
    semester: 6,
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2024-03-20")
  },
  {
    id: "8",
    name: "Gabriel Ferreira",
    age: 21,
    email: "gabriel.ferreira@iesgo.edu.br",
    course: "Odontologia",
    bio: "Estudante de Odontologia, adoro esportes e viagens. Em busca de amizades para tornar a vida universitária mais divertida.",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531945086322-64e2ffae14a0?w=800&auto=format&fit=crop&q=80"
    ],
    interests: ["esportes", "viagens", "festas"],
    lookingFor: "amizade",
    semester: 4,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-04-05")
  }
];

// Matches simulados
export const mockMatches: Match[] = [
  {
    id: "match-1",
    userId1: "1", // Ana Silva
    userId2: "4", // Lucas Oliveira
    createdAt: new Date("2024-03-15")
  },
  {
    id: "match-2",
    userId1: "3", // Juliana Costa
    userId2: "6", // Rafael Santos
    createdAt: new Date("2024-03-20")
  },
  {
    id: "match-3",
    userId1: "5", // Camila Rodrigues
    userId2: "8", // Gabriel Ferreira
    createdAt: new Date("2024-03-25")
  }
];

// Mensagens simuladas
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "1", // Ana Silva
    receiverId: "4", // Lucas Oliveira
    content: "Oi Lucas, como vai? Vi que você também gosta de música! Qual seu estilo favorito?",
    read: true,
    createdAt: new Date("2024-03-15T14:30:00")
  },
  {
    id: "msg-2",
    senderId: "4", // Lucas Oliveira
    receiverId: "1", // Ana Silva
    content: "Oi Ana! Estou bem, e você? Gosto de vários estilos, mas principalmente rock e MPB. E você?",
    read: true,
    createdAt: new Date("2024-03-15T15:10:00")
  },
  {
    id: "msg-3",
    senderId: "1", // Ana Silva
    receiverId: "4", // Lucas Oliveira
    content: "Também gosto de MPB! Qual sua banda favorita?",
    read: true,
    createdAt: new Date("2024-03-15T15:15:00")
  },
  {
    id: "msg-4",
    senderId: "3", // Juliana Costa
    receiverId: "6", // Rafael Santos
    content: "Oi Rafael! Vi que você gosta de festas universitárias. Vai na festa do curso de Psicologia essa semana?",
    read: true,
    createdAt: new Date("2024-03-21T10:20:00")
  },
  {
    id: "msg-5",
    senderId: "6", // Rafael Santos
    receiverId: "3", // Juliana Costa
    content: "Olá Juliana! Ainda não sabia dessa festa, mas agora estou interessado! Quando e onde vai ser?",
    read: false,
    createdAt: new Date("2024-03-21T11:30:00")
  }
];

// Funções para facilitar o acesso aos dados mockados
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getMatchesByUserId = (userId: string): Match[] => {
  return mockMatches.filter(match =>
    match.userId1 === userId || match.userId2 === userId
  );
};

export const getMatchedUsers = (userId: string): User[] => {
  const matches = getMatchesByUserId(userId);
  return matches.map(match => {
    const matchedUserId = match.userId1 === userId ? match.userId2 : match.userId1;
    return getUserById(matchedUserId)!;
  }).filter(Boolean);
};

export const getMessagesBetweenUsers = (userId1: string, userId2: string): Message[] => {
  return mockMessages.filter(message =>
    (message.senderId === userId1 && message.receiverId === userId2) ||
    (message.senderId === userId2 && message.receiverId === userId1)
  ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

// Gerar mais 20 usuários aleatórios
const generateRandomUsers = (count: number): User[] => {
  const randomUsers: User[] = [];
  const firstNames = ["João", "Maria", "Bruno", "Carla", "Felipe", "Amanda", "Gustavo", "Larissa", "Thiago", "Natália"];
  const lastNames = ["Alves", "Pereira", "Souza", "Fernandes", "Ribeiro", "Gomes", "Araújo", "Martins", "Barbosa", "Rocha"];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const age = Math.floor(Math.random() * 10) + 18; // 18-27 anos

    randomUsers.push({
      id: `random-${i+1}`,
      name,
      age,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@iesgo.edu.br`,
      course: getRandomCourse(),
      bio: `Estudante de ${getRandomCourse()}, gosto de ${getRandomInterests().join(", ")}.`,
      photos: [
        `https://images.unsplash.com/photo-${1500000000 + i * 10000}?w=800&auto=format&fit=crop&q=80`
      ],
      interests: getRandomInterests(),
      lookingFor: getRandomLookingFor(),
      semester: getRandomSemester(),
      createdAt: getRandomDate(),
      updatedAt: new Date()
    });
  }

  return randomUsers;
};

// Adicionar os usuários aleatórios aos usuários mockados
export const allUsers: User[] = [...mockUsers, ...generateRandomUsers(20)];
