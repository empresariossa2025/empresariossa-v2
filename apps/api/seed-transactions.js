const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTransactions() {
  console.log('Seeding point transactions...');
  
  // Busca todos os usuários existentes
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    // Cria transações variadas para cada usuário
    const transactions = [
      // Presença eventos (+30 points)
      { memberId: user.id, points: 30, category: 'ATTENDANCE', type: 'EARNED', description: 'Presença no evento de networking' },
      // Penalidade por ausência (-30 points)  
      { memberId: user.id, points: -30, category: 'ATTENDANCE', type: 'PENALTY', description: 'Ausência no evento mensal' },
      // Reunião individual (+30 points)
      { memberId: user.id, points: 30, category: 'MEETING', type: 'EARNED', description: 'Reunião individual - Setembro' },
      // Visitante trazido (+30 points)
      { memberId: user.id, points: 30, category: 'VISITOR', type: 'EARNED', description: 'Visitante: Carlos Mendes' },
      // Recomendação feita (+30 points)
      { memberId: user.id, points: 30, category: 'RECOMMENDATION', type: 'EARNED', description: 'Recomendação: Julia Santos' },
      // Recomendação fechada (+100 bonus)
      { memberId: user.id, points: 100, category: 'RECOMMENDATION', type: 'BONUS', description: 'Recomendação fechada: Julia Santos se tornou membro' },
      // Negócio - compra (+50 points)
      { memberId: user.id, points: 50, category: 'BUSINESS_DEAL', type: 'EARNED', description: 'Compra: Serviços de consultoria' },
      // Negócio - venda (+25 points)
      { memberId: user.id, points: 25, category: 'BUSINESS_DEAL', type: 'EARNED', description: 'Venda: Produtos de marketing' },
    ];
    
    for (const transaction of transactions) {
      await prisma.pointTransaction.create({ data: transaction });
    }
    
    console.log(`Transactions created for ${user.firstName} ${user.lastName}`);
  }
  
  console.log('All transactions seeded!');
}

seedTransactions()
  .catch(console.error)  
  .finally(() => prisma.$disconnect());
