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
      //Fetch from URL
       if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
        console.warn(`Invalid URL: ${item.url}`);
        return null; // Skip this item
      } 
      console.log('The URL: ' + item.url);
      let data;
      try {

        // Fetch metadata and HTML from the URL
        const response = await fetch(item.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.google.com/', 
          },
        });

        console.log('Fetched: '+ item.url);

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status} for URL: ${item.url}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const jsonScript = $('script[type="application/ld+json"]').html();

        console.log('Gotten HTML response');

        if (!jsonScript) {
          throw new Error('No JSON-LD script found on page');
        }

        const metadata = JSON.parse(jsonScript);
        console.log('Gotten metadata');


        // Combine metadata and HTML into a single object
        data = { metadata, html };
      } catch (error) {
        console.error(`Failed to fetch metadata for URL: ${item.url}`, error);
        // Return no article object on failure
        return null;
        console.log('The default empty object has been returned here');
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
      } as Article;
      console.log('Proper item returned');
    })
  );

  // Filter out null values and sort the articles by published date in descending order
  const filteredResults = results.filter((article): article is Article => article !== null);
  const sortedResults = filteredResults.sort((a, b) => {
    const dateA = new Date(a.publishedDate || '').getTime();
    const dateB = new Date(b.publishedDate || '').getTime();
    return dateB - dateA;
  });
  console.log(sortedResults);
  return sortedResults;
}