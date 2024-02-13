import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dto/create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAll() {
    return this.teamService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.teamService.getOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateTeamDto) {
    return this.teamService.create(body);
  }

  @Patch(':id')
  async edit(@Body() body: CreateTeamDto, @Param('id') id: string) {
    return this.teamService.update(Number(id), body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.teamService.remove(Number(id));
  }
}
