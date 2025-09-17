import { Injectable, Logger } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { PointCategory, PointTransactionType } from '@prisma/client'

@Injectable()
export class PointsEngineService {
  private readonly logger = new Logger(PointsEngineService.name)

  constructor(private database: DatabaseService) {}

  // === CORE POINTS OPERATIONS ===

  /**
   * Assegna punti a un membro
   */
  async awardPoints(
    memberId: string,
    points: number,
    category: PointCategory,
    type: PointTransactionType = PointTransactionType.EARNED,
    description?: string,
    metadata?: any,
    relatedEntityId?: string,
    relatedEntityType?: string
  ) {
    try {
      await this.database.$transaction(async (tx) => {
        // Ottieni o crea record punti membro
        let memberPoints = await tx.memberPoints.findUnique({
          where: { memberId }
        })

        if (!memberPoints) {
          memberPoints = await tx.memberPoints.create({
            data: { memberId, totalPoints: 0, monthlyPoints: 0, yearlyPoints: 0 }
          })
        }

        // Crea transazione punti
        const transaction = await tx.pointTransaction.create({
          data: {
            memberId,
            points,
            type,
            category,
            description,
            metadata,
            // Relazioni dinamiche basate sul tipo
            ...(relatedEntityType === 'meeting' && { meetingId: relatedEntityId }),
            ...(relatedEntityType === 'visit' && { visitId: relatedEntityId }),
            ...(relatedEntityType === 'deal' && { dealId: relatedEntityId }),
            ...(relatedEntityType === 'recommendation' && { recommendationId: relatedEntityId })
          }
        })

        // Aggiorna punti totali
        const newTotalPoints = memberPoints.totalPoints + points
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        const currentYear = currentDate.getFullYear()

        await tx.memberPoints.update({
          where: { memberId },
          data: {
            totalPoints: newTotalPoints,
            monthlyPoints: memberPoints.monthlyPoints + points,
            yearlyPoints: memberPoints.yearlyPoints + points
          }
        })

        this.logger.log(
          `Points awarded: Member ${memberId} ${type === PointTransactionType.EARNED ? 'earned' : 'lost'} ${points} points for ${category}`
        )

        return transaction
      })
    } catch (error) {
      this.logger.error('Error awarding points:', error)
      throw error
    }
  }

  /**
   * Rimuove punti (penalità)
   */
  async penalizePoints(
    memberId: string,
    points: number,
    category: PointCategory,
    description: string,
    metadata?: any
  ) {
    return this.awardPoints(
      memberId,
      -Math.abs(points), // Assicura che sia negativo
      category,
      PointTransactionType.PENALTY,
      description,
      metadata
    )
  }

  // === BUSINESS LOGIC TRIGGERS ===

  /**
   * Gestisce presenza evento (Caminho do Sucesso: Presenza)
   */
  async handleEventAttendance(eventId: string, memberId: string, attended: boolean) {
    if (attended) {
      // Award points for attendance - le penalità sono gestite dal controllo mensile
      await this.awardPoints(
        memberId,
        10, // Punti base per presenza
        PointCategory.ATTENDANCE,
        PointTransactionType.EARNED,
        'Presenza evento',
        { eventId },
        eventId,
        'event'
      )
    }
    
    // Aggiorna metriche mensili
    await this.updateMemberMetrics(memberId)
  }

  /**
   * Gestisce riunione individuale completata
   */
  async handleMeetingCompleted(meetingId: string, memberId: string) {
    await this.awardPoints(
      memberId,
      30, // 30 punti per riunione come da regole
      PointCategory.MEETING,
      PointTransactionType.EARNED,
      'Riunione individuale completata',
      { meetingId },
      meetingId,
      'meeting'
    )

    await this.updateMemberMetrics(memberId)
  }

  /**
   * Gestisce visitante portato
   */
  async handleVisitorBrought(visitId: string, hostId: string) {
    await this.awardPoints(
      hostId,
      30, // 30 punti per visitante
      PointCategory.VISITOR,
      PointTransactionType.EARNED,
      'Visitante portato',
      { visitId },
      visitId,
      'visit'
    )

    await this.updateMemberMetrics(hostId)
  }

  /**
   * Gestisce raccomandazione fatta
   */
  async handleRecommendationMade(recommendationId: string, recommenderId: string) {
    await this.awardPoints(
      recommenderId,
      30, // 30 punti per raccomandazione
      PointCategory.RECOMMENDATION,
      PointTransactionType.EARNED,
      'Raccomandazione fatta',
      { recommendationId },
      recommendationId,
      'recommendation'
    )

    await this.updateMemberMetrics(recommenderId)
  }

  /**
   * Gestisce raccomandazione chiusa con successo
   */
  async handleRecommendationClosed(recommendationId: string, recommenderId: string, amount?: number) {
    await this.awardPoints(
      recommenderId,
      100, // 100 punti per raccomandazione chiusa
      PointCategory.RECOMMENDATION,
      PointTransactionType.BONUS,
      'Raccomandazione chiusa con successo',
      { recommendationId, amount },
      recommendationId,
      'recommendation'
    )

    await this.updateMemberMetrics(recommenderId)
  }

  /**
   * Gestisce business deal completato
   */
  async handleBusinessDealCompleted(dealId: string, sellerId: string, buyerId: string, amount: number) {
    // Punti per venditore (25 punti)
    await this.awardPoints(
      sellerId,
      25,
      PointCategory.BUSINESS_DEAL,
      PointTransactionType.EARNED,
      `Vendita completata - R$ ${amount}`,
      { dealId, amount, role: 'seller' },
      dealId,
      'deal'
    )

    // Punti per acquirente (50 punti)
    await this.awardPoints(
      buyerId,
      50,
      PointCategory.BUSINESS_DEAL,
      PointTransactionType.EARNED,
      `Acquisto completato - R$ ${amount}`,
      { dealId, amount, role: 'buyer' },
      dealId,
      'deal'
    )

    await this.updateMemberMetrics(sellerId)
    await this.updateMemberMetrics(buyerId)
  }

  // === CONTROLLI PERIODICI E PENALITÀ ===

  /**
   * Controllo mensile "Caminho do Sucesso" - eseguito automaticamente
   */
  async performMonthlyAudit(month: number, year: number) {
    this.logger.log(`Performing monthly audit for ${month}/${year}`)

    const members = await this.database.user.findMany({
      where: { isActive: true },
      include: { memberPoints: true }
    })

    for (const member of members) {
      await this.auditMemberPerformance(member.id, month, year)
    }
  }

  /**
   * Audit individuale membro per mese specifico
   */
  private async auditMemberPerformance(memberId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    // Calcola metriche reali
    const [attendance, meetings, visits, recommendations] = await Promise.all([
      this.calculateAttendanceRate(memberId, month, year),
      this.countMeetings(memberId, startDate, endDate),
      this.countVisits(memberId, startDate, endDate),
      this.countRecommendations(memberId, startDate, endDate)
    ])

    // Applica penalità secondo "Caminho do Sucesso"
    
    // Penalità presenza (< 75%)
    if (attendance.rate < 75) {
      const missedEvents = attendance.totalEvents - attendance.attendedEvents
      for (let i = 0; i < missedEvents; i++) {
        await this.penalizePoints(
          memberId,
          30,
          PointCategory.ATTENDANCE,
          `Penalità assenza evento - ${month}/${year}`,
          { attendanceRate: attendance.rate, month, year }
        )
      }
    }

    // Salva metriche finali
    await this.saveMemberMetrics(memberId, month, year, {
      meetingsAttended: meetings,
      visitantsBrought: visits,
      recommendationsMade: recommendations.made,
      recommendationsClosed: recommendations.closed,
      attendanceRate: attendance.rate
    })
  }

  // === CALCOLI AUSILIARI ===

  private async calculateAttendanceRate(memberId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const attendances = await this.database.eventAttendance.findMany({
      where: {
        memberId,
        event: {
          eventDate: { gte: startDate, lte: endDate }
        }
      },
      include: { event: true }
    })

    const totalEvents = attendances.length
    const attendedEvents = attendances.filter(a => a.present).length
    const rate = totalEvents > 0 ? (attendedEvents / totalEvents) * 100 : 100

    return { rate, totalEvents, attendedEvents }
  }

  private async countMeetings(memberId: string, startDate: Date, endDate: Date) {
    return this.database.meeting.count({
      where: {
        memberId,
        meetingDate: { gte: startDate, lte: endDate },
        status: 'COMPLETED'
      }
    })
  }

  private async countVisits(memberId: string, startDate: Date, endDate: Date) {
    return this.database.memberVisit.count({
      where: {
        hostId: memberId,
        visitDate: { gte: startDate, lte: endDate }
      }
    })
  }

  private async countRecommendations(memberId: string, startDate: Date, endDate: Date) {
    const made = await this.database.recommendation.count({
      where: {
        recommenderId: memberId,
        createdAt: { gte: startDate, lte: endDate }
      }
    })

    const closed = await this.database.recommendation.count({
      where: {
        recommenderId: memberId,
        status: 'CLOSED_WON',
        closedDate: { gte: startDate, lte: endDate }
      }
    })

    return { made, closed }
  }

  // === GESTIONE METRICHE ===

  /**
   * Aggiorna metriche membro per mese corrente
   */
  private async updateMemberMetrics(memberId: string) {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const [meetings, visits, recommendations, points] = await Promise.all([
      this.countMeetings(memberId, startDate, endDate),
      this.countVisits(memberId, startDate, endDate),
      this.countRecommendations(memberId, startDate, endDate),
      this.getMonthlyPoints(memberId, month, year)
    ])

    await this.database.memberMetrics.upsert({
      where: {
        memberId_month_year: { memberId, month, year }
      },
      update: {
        meetingsAttended: meetings,
        visitantsBrought: visits,
        recommendationsMade: recommendations.made,
        recommendationsClosed: recommendations.closed,
        pointsEarned: points.earned,
        pointsLost: points.lost,
        pointsNet: points.net
      },
      create: {
        memberId,
        month,
        year,
        meetingsAttended: meetings,
        visitantsBrought: visits,
        recommendationsMade: recommendations.made,
        recommendationsClosed: recommendations.closed,
        pointsEarned: points.earned,
        pointsLost: points.lost,
        pointsNet: points.net
      }
    })
  }

  private async saveMemberMetrics(memberId: string, month: number, year: number, metrics: any) {
    await this.database.memberMetrics.upsert({
      where: {
        memberId_month_year: { memberId, month, year }
      },
      update: metrics,
      create: {
        memberId,
        month,
        year,
        ...metrics
      }
    })
  }

  private async getMonthlyPoints(memberId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const transactions = await this.database.pointTransaction.findMany({
      where: {
        memberId,
        createdAt: { gte: startDate, lte: endDate }
      }
    })

    const earned = transactions.filter(t => t.points > 0).reduce((sum, t) => sum + t.points, 0)
    const lost = transactions.filter(t => t.points < 0).reduce((sum, t) => sum + Math.abs(t.points), 0)

    return { earned, lost, net: earned - lost }
  }

  // === QUERY METHODS ===

  /**
   * Ottieni punti totali membro
   */
  async getMemberPoints(memberId: string) {
    return this.database.memberPoints.findUnique({
      where: { memberId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      }
    })
  }

  /**
   * Ottieni leaderboard punti
   */
  async getPointsLeaderboard(limit: number = 10) {
    return this.database.memberPoints.findMany({
      orderBy: { totalPoints: 'desc' },
      take: limit,
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
   * Reset punti mensili (eseguito automaticamente ogni mese)
   */
  async resetMonthlyPoints() {
    await this.database.memberPoints.updateMany({
      data: { monthlyPoints: 0 }
    })

    this.logger.log('Monthly points reset completed')
  }

  /**
   * Reset punti annuali (eseguito automaticamente ogni anno)
   */
  async resetYearlyPoints() {
    await this.database.memberPoints.updateMany({
      data: { yearlyPoints: 0, monthlyPoints: 0 }
    })

    this.logger.log('Yearly points reset completed')
  }
}
