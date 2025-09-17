import { Controller, Get, Query } from '@nestjs/common'

@Controller('points')
export class PointsController {
  @Get('test')
  async test() {
    return { 
      message: 'Points module is working!', 
      timestamp: new Date()
    }
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: string) {
    // Mock data per ora
    return [
      {
        id: '1',
        memberId: 'mock-1',
        totalPoints: 850,
        monthlyPoints: 120,
        member: {
          id: 'mock-1',
          firstName: 'João',
          lastName: 'Silva',
          email: 'joao@example.com'
        }
      },
      {
        id: '2', 
        memberId: 'mock-2',
        totalPoints: 720,
        monthlyPoints: 95,
        member: {
          id: 'mock-2',
          firstName: 'Maria',
          lastName: 'Santos',
          email: 'maria@example.com'
        }
      },
      {
        id: '3',
        memberId: 'mock-3', 
        totalPoints: 650,
        monthlyPoints: 80,
        member: {
          id: 'mock-3',
          firstName: 'Pedro',
          lastName: 'Costa',
          email: 'pedro@example.com'
        }
      }
    ]
  }

  @Get('member/:memberId')
  async getMemberPoints() {
    return {
      id: '1',
      memberId: 'mock-1',
      totalPoints: 850,
      monthlyPoints: 120,
      yearlyPoints: 580,
      member: {
        id: 'mock-1',
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao@example.com'
      },
      transactions: [
        {
          id: '1',
          points: 30,
          type: 'EARNED',
          category: 'MEETING',
          description: 'Reunião individual completada',
          createdAt: new Date().toISOString()
        },
        {
          id: '2', 
          points: 100,
          type: 'EARNED',
          category: 'RECOMMENDATION',
          description: 'Recomendação fechada com sucesso',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          points: -30,
          type: 'PENALTY', 
          category: 'ATTENDANCE',
          description: 'Penalidade por ausência',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    }
  }
}
