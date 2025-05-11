import * as fs from 'fs';
import * as cheerio from 'cheerio';

export function getMetadataFromLocalFile() {
  const html = fs.readFileSync('src/app/wsl.html', 'utf8');
  const $ = cheerio.load(html);
  const jsonScript = $('script[type="application/ld+json"]').html();
  if (!jsonScript) {
    throw new Error('No JSON-LD script found on page');
  }
  const metadata = JSON.parse(jsonScript);
  console.log("metadata");

  return {
    metadata,
    html
  };
}


