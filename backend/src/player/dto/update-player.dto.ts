import z from 'zod';

export const updatePlayerDto = z.object({
  name: z.string().min(3).max(255).optional(),
  teamId: z.number().optional(),
});

export type UpdatePlayerDto = z.infer<typeof updatePlayerDto>;
