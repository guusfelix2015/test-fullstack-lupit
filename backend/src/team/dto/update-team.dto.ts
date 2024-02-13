import z from 'zod';

export const updateTeamDto = z.object({
  name: z.string().min(3).max(255).optional(),
});

export type UpdateTeamDto = z.infer<typeof updateTeamDto>;
