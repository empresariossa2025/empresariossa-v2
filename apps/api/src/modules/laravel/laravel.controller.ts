import { Controller, Get, Query, Param } from '@nestjs/common';
import { LaravelDbService } from '../../services/laravel/laravel-db.service';

@Controller('laravel')
export class LaravelController {
  constructor(private laravelDb: LaravelDbService) {}

  @Get('users')
  async getUsers(@Query('limit') limit?: string) {
    return await this.laravelDb.getUsers(limit ? parseInt(limit) : 100);
  }

  @Get('ranking')
  async getPointsRanking() {
    return await this.laravelDb.getPointsRanking();
  }

  @Get('users/:id/points')
  async getUserPoints(@Param('id') id: string) {
    return await this.laravelDb.getUserPoints(parseInt(id));
  }
}
