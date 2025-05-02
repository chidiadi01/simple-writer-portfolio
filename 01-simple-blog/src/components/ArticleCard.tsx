import React, { useState } from 'react';
import Image  from 'next/image';


export interface Article {
  id: number;
  title?: string;
  description?: string;
  publishedDate?: string;
  url: string;
  imgUrl?: string;
  siteName?: string;
  tags?: string[];
}

const loading = true;

interface ArticleProps {
  articles: Article[];
}

console.log("Loading state: ",loading);

const ArticleCard: React.FC<ArticleProps> = ({ articles, }) => {

    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);



  return (
    <>
    {articles ?
      
      (articles.map((item, id) => (
        //anchor tag for the link
        <a key={id}  href={item.url}>
            <div className="w-full md:w-[350px] mx-auto mb-5 hover:brightness-70" data-title={item.title} data-description={item.description} data-published-date={item.publishedDate} data-tag="Networking" data-site-name={item.siteName}>
            <Image
              src={item.imgUrl || '/img-2.jpg'} 
              alt={item.title || 'Article Image'}
              width={350}
              height={400}
              className="object-cover rounded-[10px]"
            />
            <div className="flex h-[43px] text-[14px] text-gray-500 gap-2">
                <p id="Platform" className="py-2 h-[42px] md:text-sm mt-auto mb-auto">{item.siteName}</p>
                <div className="h-1 w-1 bg-black rounded-full mt-auto mb-auto bg-gray-500"></div>
                <p id="publishedDate" className="py-2 h-[42px] mt-auto mb-auto">{item.publishedDate}</p>
            </div>
            <h1 id="titleOfArticle" className="font-bold text-base md:text-3xl">{item.title}</h1>
            <br/>
            <p>{item.description}</p>
            </div>
        </a>
      )))
      :

      ( Array(6).fill(0).map((item, id) => (
        <div key={id} className="w-full md:w-[350px] h-[400px] bg-gray-100 mx-auto mb-5 hover:brightness-80'"></div>
      )))
    }
    </>
  );
};

export default ArticleCard;
