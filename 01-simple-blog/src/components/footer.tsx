

export default function Footer() {

    return (
        <footer className="bg-gray-100 text-center py-4 mt-10">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Chidiadi Anyanwu. All rights reserved.</p>
            <p className="text-sm text-gray-600">Built with Next.js and Tailwind CSS</p>
        </footer>
    );

}