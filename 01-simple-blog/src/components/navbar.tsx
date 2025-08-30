export default function Navbar(){
    return(
        <>
        <div className="flex w-[100vw] md:w-[98.2vw] lg:w-[98.8vw] h-[60px] bg-black text-white px-0 md:px-7 md:py-2 items-center justify-center md:justify-between shadow-sm border-b-4 border-gray-800">
            <h1 className="font-bold text-xl sm:text-base md:text-base">CHIDIADI &nbsp; ANYANWU</h1>
            <div className="hidden md:block flex space-x-4">
                <a href="/" className="text-white hover:text-gray-400">Blog</a>
                <a href="/about" className="text-white hover:text-gray-400">About</a>    
            </div>
        </div>
        </>
    );
}