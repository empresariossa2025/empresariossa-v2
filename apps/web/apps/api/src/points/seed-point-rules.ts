import { PrismaClient, PointCategory } from '@prisma/client'

const prisma = new PrismaClient()

async function seedPointRules() {
  const rules = [
    {
      category: PointCategory.ATTENDANCE,
      action: 'EVENT_ATTENDED',
      points: 10,
      description: 'Presenza a evento'
    },
    {
      category: PointCategory.ATTENDANCE,
      action: 'EVENT_MISSED',
      points: -30,
      description: 'Penalità assenza evento'
    },
    {
      category: PointCategory.MEETING,
      action: 'INDIVIDUAL_MEETING',
      points: 30,
      description: 'Riunione individuale completata'
    },
    {
      category: PointCategory.VISITOR,
      action: 'VISITOR_BROUGHT',
      points: 30,
      description: 'Visitante portato'
    },
    {
      category: PointCategory.RECOMMENDATION,
      action: 'RECOMMENDATION_MADE',
      points: 30,
      description: 'Raccomandazione fatta'
    },
    {
      category: PointCategory.RECOMMENDATION,
      action: 'RECOMMENDATION_CLOSED',
      points: 100,
      description: 'Raccomandazione chiusa con successo'
    },
    {
      category: PointCategory.BUSINESS_DEAL,
      action: 'DEAL_SALE',
      points: 25,
      description: 'Vendita completata'
    },
    {
      category: PointCategory.BUSINESS_DEAL,
      action: 'DEAL_PURCHASE',
      points: 50,
      description: 'Acquisto completato'
    }
  ]

  for (const rule of rules) {
    await prisma.pointRule.upsert({
      where: {
        category_action: {
          category: rule.category,
          action: rule.action
        }
      },
      update: rule,
      create: rule
    })
  }

  console.log('Point rules seeded successfully')
}

seedPointRules()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
