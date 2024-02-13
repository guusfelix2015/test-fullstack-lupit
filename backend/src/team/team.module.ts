import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
