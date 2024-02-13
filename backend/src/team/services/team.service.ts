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
    await this.prismaService.player.updateMany({
      where: { teamId: id },
      data: { teamId: null },
    });

    return this.prismaService.team.delete({
      where: { id },
    });
  }
}
