import z from 'zod';

export const updatePlayerDto = z.object({
  name: z.string().min(3).max(255).optional(),
  age: z.number().int().min(16).max(99).optional(),
  teamId: z.number().nullable().optional(),
});

export type UpdatePlayerDto = z.infer<typeof updatePlayerDto>;
