import { supabase } from "../lib/supabase";

// Sample rewards data
const sampleRewards = [
  {
    name: "Desconto em Supermercado",
    description:
      "Cupom de 10% de desconto em compras acima de R$100 no Supermercado Verde",
    points_required: 500,
    category: "Descontos",
    image_url:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
    available: "true",
  },
  {
    name: "Ingresso para Cinema",
    description: "Um ingresso para qualquer sessão no CineMT",
    points_required: 800,
    category: "Entretenimento",
    image_url:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80",
    available: "true",
  },
  {
    name: "Muda de Árvore Nativa",
    description: "Uma muda de árvore nativa do cerrado para plantar",
    points_required: 300,
    category: "Sustentabilidade",
    image_url:
      "https://images.unsplash.com/photo-1636826874099-8f5f3af30d3c?w=400&q=80",
    available: "true",
  },
  {
    name: "Curso de Compostagem",
    description: "Acesso ao curso online de compostagem doméstica",
    points_required: 450,
    category: "Educação",
    image_url:
      "https://images.unsplash.com/photo-1582560475093-ba66accbc095?w=400&q=80",
    available: "true",
  },
  {
    name: "Garrafa Reutilizável",
    description: "Garrafa de água ecológica feita de materiais reciclados",
    points_required: 600,
    category: "Produtos",
    image_url:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    available: "true",
  },
  {
    name: "Voucher para Restaurante",
    description: "Voucher de R$50 para o Restaurante Sustentável",
    points_required: 1000,
    category: "Alimentação",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    available: "true",
  },
];

// Sample ecopoints data
const sampleEcopoints = [
  {
    name: "Ecoponto Piloto - Câmara Municipal de Cuiabá",
    address:
      "Praça Barão de Melgaço, s/n - Centro, Cuiabá - MT, 78020-400",
    latitude: -15.6014,
    longitude: -56.0979,
    accepted_materials: ["Plástico", "Papel", "Vidro", "Metal"],
    operating_hours: "Segunda a Sexta: 8h às 17h",
    contact_info: "Telefone: (65) 3313-6000",
    active: true,
  },
  {
    name: "Ecoponto Shopping Cuiabá",
    address: "Av. Miguel Sutil, 8000 - Consil, Cuiabá - MT",
    latitude: -15.5989,
    longitude: -56.0949,
    accepted_materials: ["Plástico", "Papel", "Eletrônicos"],
    operating_hours: "Segunda a Sábado: 10h às 22h, Domingo: 14h às 20h",
    contact_info: "Telefone: (65) 3027-8000",
    active: true,
  },
  {
    name: "Ecoponto Pantanal Shopping",
    address: "Av. Fernando Corrêa da Costa, 1555 - Boa Esperança, Cuiabá - MT",
    latitude: -15.5611,
    longitude: -56.0731,
    accepted_materials: ["Plástico", "Papel", "Vidro", "Metal", "Eletrônicos"],
    operating_hours: "Segunda a Sábado: 10h às 22h, Domingo: 14h às 20h",
    contact_info: "Telefone: (65) 3025-2000",
    active: true,
  },
];

// Sample users data
const sampleUsers = [
  {
    name: "Admin ReciclaMT",
    email: "reciclamt.projeto@gmail.com",
    phone: "65999999999",
    points: 0,
    role: "admin",
    created_at: new Date().toISOString(),
  },
  {
    name: "Admin Teste",
    email: "admin@example.com",
    phone: "65999999998",
    points: 0,
    role: "admin",
    created_at: new Date().toISOString(),
  },
  {
    name: "Usuário Teste",
    email: "teste@reciclamt.com",
    phone: "65999999997",
    points: 100,
    role: "user",
    created_at: new Date().toISOString(),
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Iniciando população do banco de dados...");

    // Insert rewards
    console.log("📦 Inserindo recompensas...");
    const { data: rewardsData, error: rewardsError } = await supabase
      .from("rewards")
      .insert(sampleRewards)
      .select();

    if (rewardsError) {
      console.error("Erro ao inserir recompensas:", rewardsError);
    } else {
      console.log(
        `✅ ${rewardsData?.length} recompensas inseridas com sucesso`,
      );
    }

    // Insert ecopoints
    console.log("📍 Inserindo ecopontos...");
    const { data: ecopointsData, error: ecopointsError } = await supabase
      .from("ecopoints")
      .insert(sampleEcopoints)
      .select();

    if (ecopointsError) {
      console.error("Erro ao inserir ecopontos:", ecopointsError);
    } else {
      console.log(
        `✅ ${ecopointsData?.length} ecopontos inseridos com sucesso`,
      );
    }

    // Insert users
    console.log("👥 Inserindo usuários de teste...");
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .insert(sampleUsers)
      .select();

    if (usersError) {
      console.error("Erro ao inserir usuários:", usersError);
    } else {
      console.log(
        `✅ ${usersData?.length} usuários inseridos com sucesso`,
      );
    }

    console.log("🎉 População do banco de dados concluída!");
  } catch (error) {
    console.error("❌ Erro geral ao popular banco de dados:", error);
  }
}

// Execute if running directly
if (typeof window === "undefined") {
  seedDatabase();
}
