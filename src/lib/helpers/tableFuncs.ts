export function getColumnNames(table: Record<string, never>): string[] {
	return Object.keys(table);
}
