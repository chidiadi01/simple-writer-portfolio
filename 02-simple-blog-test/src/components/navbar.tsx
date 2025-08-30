export default function Navbar(){
    return(
        <>
        <div className="text-3xl md:text-base flex w-[100vw] md:w-[98.2vw] lg:w-[98.8vw] h-[60px] bg-black text-white px-0 md:px-7 md:py-2 items-center justify-center md:justify-between">
            <h1 className="font-bold">CHIDIADI &nbsp; ANYANWU</h1>
            <div className="hidden md:block flex space-x-4">
                <a href="/" className="hover:text-gray-400">Blog</a>
                <a href="/about" className="hover:text-gray-400">About</a>    
            </div>
        </div>
        </>
    );
}