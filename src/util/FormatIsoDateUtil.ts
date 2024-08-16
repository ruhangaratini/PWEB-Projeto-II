export function formatIsoDateUtil(date: Date): string {
    return date.toISOString().split('T')[0];
}