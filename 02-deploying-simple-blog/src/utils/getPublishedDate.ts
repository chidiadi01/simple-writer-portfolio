import * as cheerio from 'cheerio';

export function getPublishedDate(data: any): string {
 
  if (!data) return 'Date';

  const publishedDate = data?.metadata?.datePublished;

  if (publishedDate) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(publishedDate).toLocaleDateString('en-US', options);
  }

  
  if (data?.html) {
    const $ = cheerio.load(data?.html);
    const ogPublishedTime = $('meta[property="article:published_time"]').attr('content') ||
                            $('meta[property="og:published_time"]').attr('content') || 
                            $('meta[name="pubdate"]').attr('content');

    if (ogPublishedTime) {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(ogPublishedTime).toLocaleDateString('en-US', options);
    }
  }

  return 'Date';
}
