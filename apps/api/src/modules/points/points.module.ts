import { Module } from '@nestjs/common'
import { PointsController } from './points.controller'

@Module({
  controllers: [PointsController],
  providers: [],
})
export class PointsModule {}
