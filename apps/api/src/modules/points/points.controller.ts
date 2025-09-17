import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { PointsService } from './points.service'

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('test')
  async test() {
    return {
      message: 'Points system is working!',
      timestamp: new Date(),
      version: '2.0'
    }
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 50
    return this.pointsService.getLeaderboard(limitNum)
  }

  @Get('overview')
  async getPointsOverview() {
    return this.pointsService.getPointsOverview()
  }

  @Get('activity/recent')
  async getRecentActivity(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 20
    return this.pointsService.getRecentActivity(limitNum)
  }

  @Get('member/:id')
  async getMemberPoints(@Param('id') memberId: string) {
    return this.pointsService.getMemberPointsDetail(memberId)
  }
}
