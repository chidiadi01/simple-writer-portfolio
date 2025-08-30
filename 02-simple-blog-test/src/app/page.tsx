import { fetchArticles } from '../utils/fetchArticles';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const articles = await fetchArticles(); 

  return <HomeClient initialArticles={articles} />;
}