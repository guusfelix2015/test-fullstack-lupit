import z from 'zod';

export const createPlayerDto = z.object({
  name: z.string().min(3).max(255),
  age: z.number().int().min(16).max(99),
  teamId: z.number(),
});

export type CreatePlayerDto = z.infer<typeof createPlayerDto>;
