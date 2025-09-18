const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');
  
  // Crea alcuni utenti di test
  const users = await prisma.user.createMany({
    data: [
      { firstName: 'João', lastName: 'Silva', email: 'joao@teste.com', password: 'teste123' },
      { firstName: 'Maria', lastName: 'Santos', email: 'maria@teste.com', password: 'teste123' },
      { firstName: 'Pedro', lastName: 'Oliveira', email: 'pedro@teste.com', password: 'teste123' },
      { firstName: 'Ana', lastName: 'Costa', email: 'ana@teste.com', password: 'teste123' },
    ]
  });
  
  console.log('Users created:', users.count);

  // Busca os usuários criados
  const createdUsers = await prisma.user.findMany();
  
  // Cria pontos para cada usuário
  for (const user of createdUsers) {
    await prisma.memberPoints.create({
      data: {
        memberId: user.id,
        totalPoints: Math.floor(Math.random() * 1000) + 100,
        monthlyPoints: Math.floor(Math.random() * 200) + 50,
        yearlyPoints: Math.floor(Math.random() * 800) + 200,
      }
    });
  }
  
  console.log('MemberPoints created for all users');
  console.log('Seeding completed!');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
