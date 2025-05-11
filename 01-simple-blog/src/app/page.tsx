
import { fetchArticles } from '../utils/fetchArticles';
import HomeClient from './HomeClient';

export const revalidate = 3600;

export default async function HomePage() {
  const articles = await fetchArticles(); 

  return <HomeClient initialArticles={articles} />;
}