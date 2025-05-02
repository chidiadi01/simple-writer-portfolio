"use client";

import { useEffect, useState } from 'react';
import { getPublishedDate } from '.src/utils/getPublishedDate';
import { getTitle } from '.src/utils/getTitle';
import { getImageURL } from '.src/utils/getImageURL';
import { getDescription } from '.src/utils/getDescription';
import ArticleCard, { Article } from './ArticleCard';
import articleFile from '.src/app/articles.json';
import { getPlatform } from '.src/utils/getPlatform';


interface MainBodyProps {
  searchTerm: string;
}


export default function MainBody({ searchTerm }: MainBodyProps) {
  // Get articles from JSON file and create array of article objects

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  const tags = ["Networking", "Cloud", "DevOps", "Web Dev", "Cybersecurity"];
  const [isActive, setIsActive] = useState(tags.map(() => false));


  // Fetch data and set articles
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        articleFile.articles.map(async (item) => {
          const res = await fetch(`/api/metadata?url=${encodeURIComponent(item.url || '')}`);
          const data = await res.json();

          return {
            ...item,
            id: item.id ?? 0,
            tags: item.tags ?? [],
            title: getTitle(data) || item.title || 'No title',
            description: item.description  || getDescription(data) || 'No description',
            publishedDate: getPublishedDate(data) ?? 'No date',
            imgUrl: getImageURL(data) || item.image || '/img-2.jpg',
            siteName: getPlatform(data) || data.metadata?.publisher?.name || 'Unknown site',
            url: item.url || '',
          };
        })
      );

      const sortedResults = results.sort((a, b) => {
        const dateA = new Date(a.publishedDate || '').getTime();
        const dateB = new Date(b.publishedDate || '').getTime();
        return dateB - dateA; // Sort in descending order
      });

      setArticles(sortedResults);
    };

    fetchData();
  }, []); 

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

      <div id="articlegrid" className="w-[100vw] md:w-[98vw] grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 px-3 py-3">
        <ArticleCard articles={filteredArticles} />
      </div>
    </div>
  );
}


