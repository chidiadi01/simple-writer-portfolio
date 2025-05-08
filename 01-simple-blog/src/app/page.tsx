
import { fetchArticles } from '../utils/fetchArticles';
import HomeClient from './HomeClient';

export const revalidate = 3600;

export default async function Page() {
  const articles = await fetchArticles(); 

  return <HomeClient initialArticles={articles} />;
}