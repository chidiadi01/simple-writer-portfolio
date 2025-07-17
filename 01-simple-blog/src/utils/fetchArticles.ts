import { getPublishedDate } from './getPublishedDate';
import { getTitle } from './getTitle';
import { getImageURL } from './getImageURL';
import { getDescription } from './getDescription';
import { getPlatform } from './getPlatform';
import articleFile from '../app/articles.json';
import { Article } from '../components/ArticleCard';
import * as cheerio from 'cheerio';
import xml2js from 'xml2js';

function rss2article(xml: string): Article[] | null {
  try {
    let articles: Article[] = [];
    var parser = new xml2js.Parser();
    xml2js.parseString(xml, (err: any, result: any) => {
      if (err) {
        console.error('Error parsing RSS feed:', err);
        return null;
      }
      const items = result.rss?.channel?.[0]?.item || [];
      articles = items.map((item: any, idx: number) => ({
        id: idx + 1,
        title: item.title?.[0] || 'No title',
        description: item.description?.[0] || 'No description',
        publishedDate: new Date(item.pubDate[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        || 'No date',
        url: item.link?.[0] || '',
        imgUrl: item.enclosure?.[0]?.$.url || '/img-2.jpg', // You can enhance this to extract images from enclosure or content
        siteName: result.rss?.channel?.[0]?.title?.[0] || 'RSS Feed',
        tags: [],
      }));
    });
    return articles;
  } catch (err) {
    console.error('Error parsing RSS feed:', err);
    return null;
  }
}

export async function fetchArticles(): Promise<Article[]> {
  console.log('Fetching articles...');
  const results: (Article | Article[] | null)[] = [];

  for (const item of articleFile.articles) {
    if (!item.url || typeof item.url !== 'string' || item.url.trim() === '') {
      console.warn(`Invalid URL: ${item.url}`);
      continue;
    }
    console.log('The URL: ' + item.url);

    try {
      // If the URL looks like an RSS/Atom feed, parse as RSS
      if (item.url.endsWith('feed') || item.url.endsWith('rss')) {
        const response = await fetch('https://corsproxy.io/?key=587f5b36&url=' + item.url, {
          headers: {
            'Accept': 'application/xml; charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.google.com/',
          },
        });
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status} for URL: ${item.url}`);
          results.push(null);
          continue;
        }
        const xml = await response.text();
        const articles = rss2article(xml);
        if (articles) {
          results.push(articles);
        } else {
          results.push(null);
        }
        continue;
      }

      // Otherwise, treat as a regular HTML page
      const response = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Referer': 'https://www.google.com/',
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status} for URL: ${item.url}`);
        results.push(null);
        continue;
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const jsonScript = $('script[type="application/ld+json"]').html();

      if (!jsonScript) {
        results.push(null);
        continue;
      }

      const metadata = JSON.parse(jsonScript);
      const data = { metadata, html };

      results.push({
        ...item,
        id: item.id ?? 0,
        tags: item.tags ?? [],
        title: getTitle(data) || metadata.headline || item.title || 'No title',
        description:getDescription(data) || item.description || metadata.description || 'No description',
        publishedDate: getPublishedDate(data) || metadata.datePublished || 'No date',
        imgUrl: getImageURL(data) || metadata.image?.[0]?.url || item.image || '/img-2.jpg',
        siteName: getPlatform(data) || data.metadata?.publisher?.name || 'Unknown site',
        url: item.url || '',
      } as Article);
    } catch (error) {
      console.error(`Failed to fetch metadata for URL: ${item.url}`, error);
      results.push(null);
    }
  }

  // Filter out null values and sort the articles by published date in descending order
  const filteredResults = results.flat().filter((article): article is Article => article !== null);
  const sortedResults = filteredResults.sort((a, b) => {
    const dateA = new Date(a.publishedDate || '').getTime();
    const dateB = new Date(b.publishedDate || '').getTime();
    return dateB - dateA;
  });
  console.log(sortedResults);
  return sortedResults;
}