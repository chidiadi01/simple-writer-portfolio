'use client';

import Footer from ".src/components/footer";
import Hero from ".src/components/hero";
import MainBody from ".src/components/mainbody";
import { useState } from "react";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
         <>
         <div>
         <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         <MainBody searchTerm={searchTerm} />
         <Footer /> 
          
         </div>
         </>
  );
}
