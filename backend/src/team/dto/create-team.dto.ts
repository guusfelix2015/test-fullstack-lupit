import z from 'zod';

export const createTeamDto = z.object({
  name: z.string().min(3).max(255),
});

export type CreateTeamDto = z.infer<typeof createTeamDto>;
