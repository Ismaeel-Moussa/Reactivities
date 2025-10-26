import { z } from 'zod';
import { requiredString } from '../util/util';

export const editProfileSchema = z.object({
    displayName: requiredString('Display Name'),
    bio: z.string().nullable().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
