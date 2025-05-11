"use client";

import { useEffect, useState } from 'react';
import ArticleCard, { Article } from './ArticleCard';



interface MainBodyProps {
  searchTerm: string;
  articles: Article[];
}


export default function MainBody({ searchTerm, articles }: MainBodyProps) {
  // Get articles from JSON file and create array of article objects

  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  const tags = ["Networking", "Cloud", "DevOps", "Web Dev", "Cybersecurity"];
  const [isActive, setIsActive] = useState(tags.map(() => false));


  // Filter articles based on search term and active tags
  useEffect(() => {
    const anyTagActive = isActive.some((val) => val);

    const filtered = articles.filter((article) => {
      console.log('Search term: ' + searchTerm || 'searchTerm');
      const searchMatch =
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.siteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.publishedDate?.toLowerCase().includes(searchTerm.toLowerCase());
        
        
        console.log('This is the searchMarch: ' + searchMatch || 'FALSE searchMatch');
        console.log(article.title || 'article.title no wan show');

      const tagMatch = article.tags?.some((tag) => {
        const index = tags.indexOf(tag);
        return index !== -1 && isActive[index];
      }) || false;

      if (anyTagActive) {
        return tagMatch && searchMatch; // Only return articles if tag is active and search matches
      }

      return searchMatch; // If no tags active, return all that match the search term
    });

    setFilteredArticles(filtered);
  }, [articles, searchTerm, isActive]); 

  console.log(filteredArticles);

  return (
    <div className='scroll-smooth'>
      <div id="tags" className="flex w-full h-[200px] md:h-[60px] justify-center gap-5 py-4 flex-wrap max-w-[100vw] scroll-smooth">
        {tags.map((tag, index) => (
          <p
            key={index}
            onClick={() => {
              const newIsActive = [...isActive];
              newIsActive[index] = !newIsActive[index];
              setIsActive(newIsActive);
            }}
            className={`h-[48px] w-[140px] border-3 rounded-[40px] px-2 py-2 text-center font-bold ${
              isActive[index]
                ? 'bg-black border-black text-white hover:bg-gray-700 hover:border-gray-700'
                : 'border-blue-500 hover:bg-blue-500 hover:text-white'
            }`}>
            {tag}
          </p>
        ))}
      </div>

      <div id="articlegrid" className="w-[100vw] md:w-[98vw] grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5 px-3 py-3">
        <ArticleCard articles={filteredArticles} />
      </div>
    </div>
  );
}


