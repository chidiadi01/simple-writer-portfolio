import { getPublishedDate } from './getPublishedDate';
import { getTitle } from './getTitle';
import { getImageURL } from './getImageURL';
import { getDescription } from './getDescription';
import { getPlatform } from './getPlatform';
import articleFile from '../app/articles.json';
import { Article } from '../components/ArticleCard';

export async function fetchArticles(): Promise<Article[]> {
    console.log('Fetching articles...');
  const results = await Promise.all(
    articleFile.articles.map(async (item) => {
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';        
      const res = await fetch(`${baseUrl}/api/metadata?url=${encodeURIComponent(item.url || '')}`);
      const data = await res.json();

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