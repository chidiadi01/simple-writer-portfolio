import { getPublishedDate } from './getPublishedDate';
import { getTitle } from './getTitle';
import { getImageURL } from './getImageURL';
import { getDescription } from './getDescription';
import { getPlatform } from './getPlatform';
import articleFile from '../app/articles.json';
import { Article } from '../components/ArticleCard';
import * as cheerio from 'cheerio';

export async function fetchArticles(): Promise<Article[]> {
  console.log('Fetching articles...');
  const results = await Promise.all(
    articleFile.articles.map(async (item) => {
      let data;
      try {
        // Fetch metadata and HTML from the URL
        const response = await fetch(item.url);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status} for URL: ${item.url}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        const jsonScript = $('script[type="application/ld+json"]').html();

        if (!jsonScript) {
          throw new Error('No JSON-LD script found on page');
        }

        const metadata = JSON.parse(jsonScript);

        // Combine metadata and HTML into a single object
        data = { metadata, html };
      } catch (error) {
        console.error(`Failed to fetch metadata for URL: ${item.url}`, error);
        // Return a default article object on failure
        return {
          ...item,
          id: item.id ?? 0,
          tags: item.tags ?? [],
          title: item.title || 'No title',
          description: item.description || 'No description',
          publishedDate: 'No date',
          imgUrl: '/img-2.jpg',
          siteName: 'Unknown site',
          url: item.url || '',
        };
      }

      // Use the combined data (metadata and HTML) to construct the article object
      return {
        ...item,
        id: item.id ?? 0,
        tags: item.tags ?? [],
        title: getTitle(data) || item.title || 'No title',
        description: item.description || getDescription(data) || 'No description',
        publishedDate: getPublishedDate(data) ?? 'No date',
        imgUrl: getImageURL(data) || item.image || '/img-2.jpg',
        siteName: getPlatform(data) || data.metadata?.publisher?.name || 'Unknown site',
        url: item.url || '',
      };
    })
  );

  // Sort the articles by published date in descending order
  return results.sort((a, b) => {
    const dateA = new Date(a.publishedDate || '').getTime();
    const dateB = new Date(b.publishedDate || '').getTime();
    return dateB - dateA;
  });
}