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

  /**
   * Regra 1: PRESENÇA - Mínimo 75% de presença
   * Se < 75% = -30 pontos por evento perdido
   */
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

  /**
   * Regra 2: REUNIÃO INDIVIDUAL - Mínimo 3 por mês
   * +30 pontos por reunião realizada
   */
  async processIndividualMeeting(memberId: string, meetingId: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.MEETING,
      type: PointTransactionType.EARNED,
      description: `Reunião individual realizada`,
      metadata: { meetingId, rule: 'individual_meeting' }
    })

    this.logger.log(`Meeting points awarded: Member ${memberId} earned 30 points`)
  }

  /**
   * Regra 3: VISITANTES - Mínimo 1 por mês
   * +30 pontos por visitante trazido
   */
  async processVisitorReferred(memberId: string, visitorName: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.VISITOR,
      type: PointTransactionType.EARNED,
      description: `Visitante trazido: ${visitorName}`,
      metadata: { visitorName, rule: 'visitor_referred' }
    })

    this.logger.log(`Visitor points awarded: Member ${memberId} earned 30 points`)
  }

  /**
   * Regra 4: RECOMENDAÇÃO PARA MEMBROS - Mínimo 3 por mês
   * +30 pontos por recomendação feita
   */
  async processRecommendationMade(memberId: string, recommendedName: string, recommendedEmail?: string) {
    await this.awardPoints({
      memberId,
      points: 30,
      category: PointCategory.RECOMMENDATION,
      type: PointTransactionType.EARNED,
      description: `Recomendação para membro: ${recommendedName}`,
      metadata: { recommendedName, recommendedEmail, rule: 'recommendation_made' }
    })

    this.logger.log(`Recommendation points awarded: Member ${memberId} earned 30 points`)
  }

  /**
   * Regra 5: RECOMENDAÇÃO FECHADA - Sem mínimo
   * +100 pontos quando recomendação vira membro
   */
  async processRecommendationClosed(memberId: string, newMemberName: string) {
    await this.awardPoints({
      memberId,
      points: 100,
      category: PointCategory.RECOMMENDATION,
      type: PointTransactionType.BONUS,
      description: `Recomendação fechada: ${newMemberName} virou membro`,
      metadata: { newMemberName, rule: 'recommendation_closed' }
    })

    this.logger.log(`Recommendation bonus awarded: Member ${memberId} earned 100 points`)
  }

  /**
   * Regra 6: NEGÓCIO FECHADO - COMPRA
   * +50 pontos por compra dentro do grupo
   */
  async processBusinessPurchase(buyerId: string, sellerId: string, amount: number, description: string) {
    await this.awardPoints({
      memberId: buyerId,
      points: 50,
      category: PointCategory.BUSINESS_DEAL,
      type: PointTransactionType.EARNED,
      description: `Compra realizada: ${description}`,
      metadata: { sellerId, amount, type: 'purchase', rule: 'business_purchase' }
    })

    this.logger.log(`Purchase points awarded: Member ${buyerId} earned 50 points`)
  }

  /**
   * Regra 7: NEGÓCIO FECHADO - VENDA
   * +25 pontos por venda dentro do grupo
   */
  async processBusinessSale(sellerId: string, buyerId: string, amount: number, description: string) {
    await this.awardPoints({
      memberId: sellerId,
      points: 25,
      category: PointCategory.BUSINESS_DEAL,
      type: PointTransactionType.EARNED,
      description: `Venda realizada: ${description}`,
      metadata: { buyerId, amount, type: 'sale', rule: 'business_sale' }
    })

    this.logger.log(`Sale points awarded: Member ${sellerId} earned 25 points`)
  }

  // ========================
  // CORE DATABASE OPERATIONS
  // ========================

  private async awardPoints({
    memberId,
    points,
    category,
    type,
    description,
    metadata = {}
  }: {
    memberId: string
    points: number
    category: PointCategory
    type: PointTransactionType
    description?: string
    metadata?: any
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        // 1. Create point transaction
        await tx.pointTransaction.create({
          data: {
            memberId,
            points,
            category,
            type,
            description,
            metadata
          }
        })

        // 2. Update or create member points summary
        const existingMemberPoints = await tx.memberPoints.findUnique({
          where: { memberId }
        })

        if (existingMemberPoints) {
          await tx.memberPoints.update({
            where: { memberId },
            data: {
              totalPoints: existingMemberPoints.totalPoints + points,
              monthlyPoints: existingMemberPoints.monthlyPoints + points,
              yearlyPoints: existingMemberPoints.yearlyPoints + points
            }
          })
        } else {
          await tx.memberPoints.create({
            data: {
              memberId,
              totalPoints: points,
              monthlyPoints: points,
              yearlyPoints: points
            }
          })
        }
      })

      this.logger.log(`Points transaction completed: Member ${memberId}, Points ${points}, Category ${category}`)
    } catch (error) {
      this.logger.error(`Error awarding points to member ${memberId}:`, error)
      throw error
    }
  }

  // ========================
  // QUERY METHODS FOR API
  // ========================

  /**
   * Get leaderboard with member info
   */
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

  /**
   * Get member points detail with recent transactions
   */
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

  /**
   * Get points overview stats
   */
  async getPointsOverview() {
    const [
      totalMembers,
      totalPointsSum,
      averagePoints
    ] = await Promise.all([
      this.prisma.memberPoints.count(),
      this.prisma.memberPoints.aggregate({
        _sum: { totalPoints: true }
      }),
      this.prisma.memberPoints.aggregate({
        _avg: { totalPoints: true }
      })
    ])

    return {
      totalMembers,
      totalPoints: totalPointsSum._sum.totalPoints || 0,
      averagePoints: Math.round(averagePoints._avg.totalPoints || 0),
      timestamp: new Date()
    }
  }

  /**
   * Get recent point transactions across all members
   */
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

  // ========================
  // MONTHLY/YEARLY RESET OPERATIONS
  // ========================

  /**
   * Reset monthly points (call via cron job)
   */
  async resetMonthlyPoints() {
    const result = await this.prisma.memberPoints.updateMany({
      data: { monthlyPoints: 0 }
    })

    this.logger.log(`Monthly points reset completed for ${result.count} members`)
    return result
  }

  /**
   * Reset yearly points (call via cron job)
   */
  async resetYearlyPoints() {
    const result = await this.prisma.memberPoints.updateMany({
      data: { yearlyPoints: 0 }
    })

    this.logger.log(`Yearly points reset completed for ${result.count} members`)
    return result
  }
}
