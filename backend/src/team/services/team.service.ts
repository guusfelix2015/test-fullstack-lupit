import { PrismaService } from '@/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { type CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto, updateTeamDto } from '../dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTeamDto) {
    return this.prismaService.team.create({
      data: {
        name: data.name,
      },
    });
  }

  getAll() {
    return this.prismaService.team.findMany();
  }

  async getOne(id: number) {
    const team = await this.prismaService.team.findUnique({
      where: { id },
    });

    if (!team) throw new BadRequestException('Team not found');

    return this.prismaService.team.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateTeamDto) {
    const team = await this.prismaService.team.findUnique({
      where: { id },
    });

    if (!team) throw new BadRequestException('Team not found');

    const payload = updateTeamDto.parse(data);
    return this.prismaService.team.update({
      where: { id },
      data: {
        name: payload.name,
      },
    });
  }
  async remove(id: number) {
    // Verifique se o time tem jogadores associados
    const players = await this.prismaService.player.findMany({
      where: { teamId: id },
    });

    if (players.length > 0) {
      throw new BadRequestException(
        'This team has associated players and cannot be deleted',
      );
    }

    // Se não tiver jogadores associados, prossiga com a exclusão
    return this.prismaService.team.delete({
      where: { id },
    });
  }
}
