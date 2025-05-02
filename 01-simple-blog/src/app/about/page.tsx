
import Image from "next/image";
import Footer from "@/components/footer";

export default function About() {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="margin-auto w-[90vw] md:w-[60vw] lg:w-[50vw] h-[450px] hover:bg-gray-100 border-1 md:border-2 border-gray-200 shadow-sm flex flex-wrap  items-center justify-center gap-2 mt-10 mb-10 rounded-lg">
                    <Image
                        src="/MyPhotoChidiadi.jpg" 
                        alt="Avatar"
                        className="rounded-[50%] h-30 w-30"
                        width={120} 
                        height={120} 
                    />
                    <div className="w-[90%] mx-auto">
                        <h1 className="text-xl text-center my-1 font-bold">About Me</h1>
                        <p className="text-justify my-3">
                            My name is Chidiadi Anyanwu. I love breaking down complex concepts.
                            I write about Networking, Cloud, DevOps, and even sometimes web development. 
                            You can connect with me by following any of the links below.
                        </p>
                        <hr className="border-gray-300 my-3" />
                        <div className="flex gap-7 w-full my-3 justify-center"> 
                            <a href="https://github.com/chidiadi01">
                                <Image src='/github-icon.svg' alt="github logo" width={24} height={24} />
                            </a>
                            <a href="https://linkedin.com/in/chidiadi-anyanwu">
                                <Image src='linkedin-icon.svg' alt="linkedin logo" width={24} height={24}/>
                            </a>
                            <a href="https://x.com/chidiadi01">
                                <Image src='x-2.svg' alt="x logo" width={24} height={24}/> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}