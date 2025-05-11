import * as cheerio from 'cheerio';

export function getDescription(data: any): string {
  if (!data) return 'Description Loading . . .';

  if (data?.metadata || data?.html) {
    const $ = cheerio.load(data?.html || '');
    const description = data?.metadata?.description ?? $('meta[property="og:description"]').attr('content') ?? 'No description found';
    return description;
  }

  return 'No description found';
}
