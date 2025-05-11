

export default function Footer() {

    return (
        <footer className="bg-gray-100 text-center py-4 mt-10">
            <div className="flex align-items-center justify-center text-sm text-blue-400 font-bold">
                <a href="/" className="hover:text-blue-600">Home</a>
                <p> &nbsp; &nbsp; | &nbsp; &nbsp; </p>
                <a href="/about" className="hover:text-blue-600">About</a>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Chidiadi Anyanwu. All rights reserved.</p>
            <p className="text-sm text-gray-600">Built with Next.js and Tailwind CSS</p>
        </footer>
    );

}