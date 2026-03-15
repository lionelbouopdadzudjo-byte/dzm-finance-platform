export class NaturalLanguageSearchModule { parse(query: string) { return { safeFilters: { q: query } }; } }
