'use client';

import { useState } from 'react';
import Hero from '../components/hero';
import MainBody from '../components/mainbody';
import { Article } from '../components/ArticleCard';

interface Props {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  return (
    <div>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainBody searchTerm={searchTerm} articles={articles} />
    </div>
  );
}
