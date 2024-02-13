import { PrismaService } from '@/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto, updatePlayerDto } from '../dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreatePlayerDto) {
    return this.prismaService.player.create({
      data: {
        name: data.name,
        teamId: data.teamId,
      },
    });
  }

  getAll() {
    return this.prismaService.player.findMany({
      include: {
        team: {
          select: { name: true, id: true },
        },
      },
    });
  }

  async getOne(id: string) {
    const player = await this.prismaService.player.findUnique({
      where: { id },
    });

    if (!player) throw new BadRequestException('Player not found');

    return player;
  }

  async update(id: string, data: UpdatePlayerDto) {
    const player = await this.prismaService.player.findUnique({
      where: { id },
    });

    if (!player) throw new BadRequestException('Player not found');

    const payload = updatePlayerDto.parse(data);
    return this.prismaService.player.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string) {
    const player = await this.prismaService.player.findUnique({
      where: { id },
    });

    if (!player.id) throw new BadRequestException('Player not found');

    return this.prismaService.player.delete({
      where: { id },
    });
  }
}
