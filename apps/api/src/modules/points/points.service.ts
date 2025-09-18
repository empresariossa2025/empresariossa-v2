import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../core/database/prisma.service'
import { PointCategory, PointTransactionType } from '@prisma/client'

@Injectable()
export class PointsService {
  private readonly logger = new Logger(PointsService.name)
  
  constructor(private prisma: PrismaService) {}

  // ========================
  // CORE BUSINESS RULES - Sistema Caminho do Sucesso
  // ========================

  async processAttendancePenalty(memberId: string, eventId: string) {
    await this.awardPoints({
      memberId,
      points: -30,
      category: PointCategory.ATTENDANCE,
      type: PointTransactionType.PENALTY,
      description: `Penalidade por ausência no evento ${eventId}`,
      metadata: { eventId, rule: 'attendance_penalty' }
    })
    this.logger.log(`Applied attendance penalty: Member ${memberId} lost 30 points`)
  }

  async processIndividualMeeting(memberId: string, meetingId: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.MEETING,
      type: PointTransactionType.EARNED,
      description: `Reunião individual realizada`,
      metadata: { meetingId, rule: 'individual_meeting' }
    })
    this.logger.log(`Individual meeting points awarded: Member ${memberId} gained 30 points`)
  }

  async processVisitorReferred(memberId: string, visitorName: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.VISITOR,
      type: PointTransactionType.EARNED,
      description: `Visitante referido: ${visitorName}`,
      metadata: { visitorName, rule: 'visitor_referred' }
    })
    this.logger.log(`Visitor referral points awarded: Member ${memberId} gained 30 points`)
  }

  async processRecommendationMade(memberId: string, recommendedName: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.RECOMMENDATION,
      type: PointTransactionType.EARNED,
      description: `Recomendação: ${recommendedName}`,
      metadata: { recommendedName, rule: 'recommendation_made' }
    })
    this.logger.log(`Recommendation points awarded: Member ${memberId} gained 30 points`)
  }

  async processRecommendationClosed(memberId: string, newMemberName: string) {
    await this.awardPoints({
      memberId,
      points: 100,
      category: PointCategory.RECOMMENDATION,
      type: PointTransactionType.BONUS,
      description: `Recomendação fechada: ${newMemberName} se tornou membro`,
      metadata: { newMemberName, rule: 'recommendation_closed' }
    })
    this.logger.log(`Recommendation closure bonus: Member ${memberId} gained 100 points`)
  }

  async processBusinessPurchase(buyerId: string, sellerId: string, amount: number, description: string) {
    await this.awardPoints({
      memberId: buyerId,
      points: 50,
      category: PointCategory.BUSINESS_DEAL,
      type: PointTransactionType.EARNED,
      description: `Compra: ${description}`,
      metadata: { sellerId, amount, rule: 'business_purchase' }
    })
    this.logger.log(`Business purchase points: Member ${buyerId} gained 50 points`)
  }

  async processBusinessSale(sellerId: string, buyerId: string, amount: number, description: string) {
    await this.awardPoints({
      memberId: sellerId,
      points: 25,
      category: PointCategory.BUSINESS_DEAL,
      type: PointTransactionType.EARNED,
      description: `Venda: ${description}`,
      metadata: { buyerId, amount, rule: 'business_sale' }
    })
    this.logger.log(`Business sale points: Member ${sellerId} gained 25 points`)
  }

  // ========================
  // CORE TRANSACTION MANAGEMENT - CORRECTED
  // ========================

  private async awardPoints({ memberId, points, category, type, description, metadata = {} }) {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfYear = new Date(now.getFullYear(), 0, 1)

      await this.prisma.$transaction(async (tx) => {
        // 1. Create point transaction
        await tx.pointTransaction.create({
          data: { memberId, points, category, type, description, metadata }
        })

        // 2. Recalculate totals from actual transactions
        const [totalResult, monthlyResult, yearlyResult] = await Promise.all([
          tx.pointTransaction.aggregate({
            where: { memberId },
            _sum: { points: true }
          }),
          tx.pointTransaction.aggregate({
            where: { 
              memberId,
              createdAt: { gte: startOfMonth }
            },
            _sum: { points: true }
          }),
          tx.pointTransaction.aggregate({
            where: { 
              memberId,
              createdAt: { gte: startOfYear }
            },
            _sum: { points: true }
          })
        ])

        const totalPoints = totalResult._sum.points || 0
        const monthlyPoints = monthlyResult._sum.points || 0
        const yearlyPoints = yearlyResult._sum.points || 0

        // 3. Update or create member points with calculated values
        await tx.memberPoints.upsert({
          where: { memberId },
          update: {
            totalPoints,
            monthlyPoints,
            yearlyPoints,
            updatedAt: now
          },
          create: {
            memberId,
            totalPoints,
            monthlyPoints,
            yearlyPoints
          }
        })
      })

      this.logger.log(`Points transaction completed: Member ${memberId}, Points ${points}, Category ${category}`)
    } catch (error) {
      this.logger.error(`Error awarding points to member ${memberId}:`, error)
      throw error
    }
  }

  // ========================
  // API QUERY METHODS (UNCHANGED)
  // ========================

  async getLeaderboard(limit: number = 50) {
    return this.prisma.memberPoints.findMany({
      take: limit,
      orderBy: { totalPoints: 'desc' },
      include: {
        member: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })
  }

  async getMemberPointsDetail(memberId: string) {
    const [memberPoints, recentTransactions] = await Promise.all([
      this.prisma.memberPoints.findUnique({
        where: { memberId },
        include: {
          member: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      }),
      this.prisma.pointTransaction.findMany({
        where: { memberId },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    ])

    return {
      memberPoints,
      recentTransactions
    }
  }

  async getPointsOverview() {
    const [totalMembersResult, totalPointsResult] = await Promise.all([
      this.prisma.memberPoints.count(),
      this.prisma.memberPoints.aggregate({
        _sum: { totalPoints: true }
      })
    ])

    const totalMembers = totalMembersResult
    const totalPoints = totalPointsResult._sum.totalPoints || 0
    const averagePoints = totalMembers > 0 ? Math.round(totalPoints / totalMembers) : 0

    return {
      totalMembers,
      totalPoints,
      averagePoints,
      timestamp: new Date()
    }
  }

  async getRecentActivity(limit: number = 20) {
    return this.prisma.pointTransaction.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        member: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })
  }

  async resetMonthlyPoints() {
    const result = await this.prisma.memberPoints.updateMany({
      data: { monthlyPoints: 0 }
    })
    this.logger.log(`Monthly points reset completed for ${result.count} members`)
    return result
  }

  async resetYearlyPoints() {
    const result = await this.prisma.memberPoints.updateMany({
      data: { yearlyPoints: 0 }
    })
    this.logger.log(`Yearly points reset completed for ${result.count} members`)
    return result
  }
}
