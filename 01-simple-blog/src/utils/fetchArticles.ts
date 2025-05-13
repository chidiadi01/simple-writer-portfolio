import { getPublishedDate } from './getPublishedDate';
import { getTitle } from './getTitle';
import { getImageURL } from './getImageURL';
import { getDescription } from './getDescription';
import { getPlatform } from './getPlatform';
import articleFile from '../app/articles.json';
import { Article } from '../components/ArticleCard';
import { getMetadataFromURL } from './getMetadataFromURL';

export async function fetchArticles(): Promise<Article[]> {
    console.log('Fetching articles...');
  const results = await Promise.all(
    articleFile.articles.map(async (item) => {
           
      let data;
      try {
        const res = await getMetadataFromURL(item.url);
        data = res;
      } catch (error) {
        console.error(`Failed to fetch metadata for URL: ${item.url}`, error);
        return null;
      }

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