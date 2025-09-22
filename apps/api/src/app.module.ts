import { Module } from '@nestjs/common'
import { LaravelModule } from './modules/laravel/laravel.module';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './core/database/database.module'
import { AuthModule } from './core/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { OrganizationsModule } from './modules/organizations/organizations.module'
import { EventsModule } from './modules/events/events.module'
import { PointsModule } from './modules/points/points.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    EventsModule,
    PointsModule,
    LaravelModule,
  ],
})
export class AppModule {}
