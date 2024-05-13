import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, 'Enter at least one character'),
  password: z.string().min(1, 'Enter at least one character'),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
