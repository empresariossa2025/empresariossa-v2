const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function recalculateAllPoints() {
  console.log('Ricalcolando tutti i punti...');
  
  const users = await prisma.user.findMany({
    where: {
      pointTransactions: {
        some: {}
      }
    }
  });

  for (const user of users) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [totalResult, monthlyResult, yearlyResult] = await Promise.all([
      prisma.pointTransaction.aggregate({
        where: { memberId: user.id },
        _sum: { points: true }
      }),
      prisma.pointTransaction.aggregate({
        where: { 
          memberId: user.id,
          createdAt: { gte: startOfMonth }
        },
        _sum: { points: true }
      }),
      prisma.pointTransaction.aggregate({
        where: { 
          memberId: user.id,
          createdAt: { gte: startOfYear }
        },
        _sum: { points: true }
      })
    ]);

    const totalPoints = totalResult._sum.points || 0;
    const monthlyPoints = monthlyResult._sum.points || 0;
    const yearlyPoints = yearlyResult._sum.points || 0;

    await prisma.memberPoints.upsert({
      where: { memberId: user.id },
      update: { totalPoints, monthlyPoints, yearlyPoints },
      create: { memberId: user.id, totalPoints, monthlyPoints, yearlyPoints }
    });

    console.log(`${user.firstName}: Total=${totalPoints}, Mês=${monthlyPoints}, Ano=${yearlyPoints}`);
  }
  
  console.log('Ricalcolo completato!');
}

recalculateAllPoints().finally(() => prisma.$disconnect());
