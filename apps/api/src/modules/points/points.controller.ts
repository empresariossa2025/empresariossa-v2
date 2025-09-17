import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { PointsEngineService } from './points-engine.service'
import { PointCategory, PointTransactionType } from '@prisma/client'

@Controller('points')
export class PointsController {
  constructor(private pointsEngine: PointsEngineService) {}

  @Get('member/:memberId')
  async getMemberPoints(@Param('memberId') memberId: string) {
    return this.pointsEngine.getMemberPoints(memberId)
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10
    return this.pointsEngine.getPointsLeaderboard(limitNum)
  }

  @Post('award')
  async awardPoints(@Body() data: {
    memberId: string
    points: number
    category: PointCategory
    description?: string
    metadata?: any
  }) {
    return this.pointsEngine.awardPoints(
      data.memberId,
      data.points,
      data.category,
      PointTransactionType.EARNED,
      data.description,
      data.metadata
    )
  }

  @Post('penalize')
  async penalizePoints(@Body() data: {
    memberId: string
    points: number
    category: PointCategory
    description: string
    metadata?: any
  }) {
    return this.pointsEngine.penalizePoints(
      data.memberId,
      data.points,
      data.category,
      data.description,
      data.metadata
    )
  }

  @Post('audit/:month/:year')
  async performMonthlyAudit(
    @Param('month') month: string,
    @Param('year') year: string
  ) {
    return this.pointsEngine.performMonthlyAudit(
      parseInt(month),
      parseInt(year)
    )
  }

  // Trigger endpoints per testing
  @Post('trigger/meeting-completed')
  async triggerMeetingCompleted(@Body() data: { meetingId: string; memberId: string }) {
    return this.pointsEngine.handleMeetingCompleted(data.meetingId, data.memberId)
  }

  @Post('trigger/visitor-brought')
  async triggerVisitorBrought(@Body() data: { visitId: string; hostId: string }) {
    return this.pointsEngine.handleVisitorBrought(data.visitId, data.hostId)
  }

  @Post('trigger/recommendation-made')
  async triggerRecommendationMade(@Body() data: { recommendationId: string; recommenderId: string }) {
    return this.pointsEngine.handleRecommendationMade(data.recommendationId, data.recommenderId)
  }

  @Post('trigger/recommendation-closed')
  async triggerRecommendationClosed(@Body() data: { 
    recommendationId: string
    recommenderId: string
    amount?: number
  }) {
    return this.pointsEngine.handleRecommendationClosed(
      data.recommendationId,
      data.recommenderId,
      data.amount
    )
  }

  @Post('trigger/business-deal-completed')
  async triggerBusinessDealCompleted(@Body() data: {
    dealId: string
    sellerId: string
    buyerId: string
    amount: number
  }) {
    return this.pointsEngine.handleBusinessDealCompleted(
      data.dealId,
      data.sellerId,
      data.buyerId,
      data.amount
    )
  }
}

  @Get('stats/overview')
  async getPointsOverview() {
    const [totalMembers, totalPoints, monthlyAverage] = await Promise.all([
      this.prisma.memberPoints.count(),
      this.prisma.memberPoints.aggregate({
        _sum: { totalPoints: true }
      }),
      this.prisma.memberPoints.aggregate({
        _avg: { monthlyPoints: true }
      })
    ])

    return {
      totalMembers,
      totalPoints: totalPoints._sum.totalPoints || 0,
      monthlyAverage: Math.round(monthlyAverage._avg.monthlyPoints || 0)
    }
  }

  @Get('activity/recent')
  async getRecentActivity(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 20
    
    return this.prisma.pointTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: limitNum,
      include: {
        member: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })
  }
