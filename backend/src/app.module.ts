import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './team/team.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PlayerModule,
    TeamModule,
    PrismaModule,
  ],
})
export class AppModule {}
