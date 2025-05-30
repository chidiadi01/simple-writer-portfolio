"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';



interface HeroProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }
export default function Hero({ searchTerm, setSearchTerm }: HeroProps) {
    const [buttonColor, setButtonColor] = useState('');
        
    return (
        <div className="bg-[url('/img-one-1.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center h-[400px] relative">
           <div className=" absolute inset-0 bg-black opacity-60"></div> 
            <h1 className="text-4xl text-white font-bold text-center z-10">My Portfolio Blog</h1>
            <p className="mt-4 mx-4 text-xlarge text-white md:text-xl text-justify md:text-center z-10" style={{ fontFamily: "Cormorant Garamond" }}>
                My name is Chidiadi Anyanwu. I am a technical writer with a strong background in networking. 
                I write about Networking, Cloud, DevOps, and even sometimes web development like this one. I built this
                website with Next.js, and there's also an <a href="https://freecodecamp.org/news/how-to-build-a-simple-portfolio-blog-with-nextjs

" className="text-blue-500 hover:text-blue-700 hover:underline">article about that.</a>
                &nbsp; This website holds my technical articles in one place. It is a repository of my written works.
            </p>
            <div id="searchbar" className="h-9xl mt-4 flex align-items-center justify-center w-full" >

                <form onSubmit={(e) => {e.preventDefault();  setSearchTerm(searchTerm);}} className="group mt-4 relative w-[70%] md:w-[50%]">
                    <input  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value) } onFocus={()=>{setButtonColor('bg-blue-500'); console.log('input focused')}} onBlur={()=>{setButtonColor('');}}type="search" placeholder="Search Chidiadi's articles" className="h-[50px] w-full px-[48px] border-3 border-blue-300 rounded-[25px] focus:outline-none focus:border-blue-500 text-black bg-white"/>
                    <button className={`h-[42px] w-[42px] absolute right-0 mr-1.5 mt-1 rounded-[50%] bg-blue-300 ${buttonColor}`}>
                        <Search  className='m-auto text-white'/>
                    </button>
                </form>

            </div>
        </div>
    );
}