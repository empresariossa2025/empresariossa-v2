import { Module } from '@nestjs/common'
import { PointsController } from './points.controller'
import { PointsService } from './points.service'
import { DatabaseModule } from '../../core/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [PointsService],
  controllers: [PointsController],
  exports: [PointsService]
})
export class PointsModule {}
