import { Module } from '@nestjs/common'
import { PointsEngineService } from './points-engine.service'
import { PointsController } from './points.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [PointsEngineService],
  controllers: [PointsController],
  exports: [PointsEngineService]
})
export class PointsModule {}
