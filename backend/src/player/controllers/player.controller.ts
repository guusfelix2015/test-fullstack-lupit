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
import { PlayerService } from '../services/player.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getAll() {
    return this.playerService.getAll();
  }

  @Post()
  async create(@Body() body: CreatePlayerDto) {
    return this.playerService.create(body);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.playerService.getOne(id);
  }

  @Patch(':id')
  async edit(@Body() body: UpdatePlayerDto, @Param('id') id: string) {
    return this.playerService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.playerService.remove(id);
  }
}
