import { format, formatDistanceToNow, type DateArg } from 'date-fns';
import { z } from 'zod';
export function formatDate(
    date: DateArg<Date> = new Date(),
    pattern = 'dd MMM yyyy h:mm a'
): string {
    return format(new Date(date), pattern);
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago';
}

export const requiredString = (fieldName: string) =>
    z.string().min(1, { message: `${fieldName} is required` });
