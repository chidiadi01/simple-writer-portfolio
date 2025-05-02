 import * as cheerio from 'cheerio';

export async function getMetadataFromURL(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const jsonScript = $('script[type="application/ld+json"]').html();
  
  if (!jsonScript) {
    throw new Error('No JSON-LD script found on page');
  }

  const metadata = JSON.parse(jsonScript);

  return {
    metadata,
    html
  };
}
 