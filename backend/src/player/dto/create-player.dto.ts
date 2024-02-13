import z from 'zod';

export const createPlayerDto = z.object({
  name: z.string().min(3).max(255),
  teamId: z.number(),
});

export type CreatePlayerDto = z.infer<typeof createPlayerDto>;
