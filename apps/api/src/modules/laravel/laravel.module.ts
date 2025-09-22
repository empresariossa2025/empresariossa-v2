import { Module } from '@nestjs/common';
import { LaravelController } from './laravel.controller';
import { LaravelDbService } from '../../services/laravel/laravel-db.service';

@Module({
  controllers: [LaravelController],
  providers: [LaravelDbService],
  exports: [LaravelDbService]
})
export class LaravelModule {}
