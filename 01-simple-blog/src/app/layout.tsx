import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from ".src/components/navbar";
import Footer from ".src/components/footer";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chidiadi Portfolio Blog",
  description: "Chidiadi's personal portfolio blog showcasing technical articles on networking, cloud, and DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:ital,opsz@0,14..32;1,14..32&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>


      
         {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Chidiadi Portfolio Blog" />
        <meta property="og:description" content="Chidiadi's personal portfolio blog showcasing technical articles on networking, cloud, and DevOps." />
        <meta property="og:image" content="/mpbi.png" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chidiadi Portfolio Blog" />
        <meta name="twitter:description" content="Chidiadi's personal portfolio blog showcasing technical articles on networking, cloud, and DevOps." />
        <meta name="twitter:image" content="/mpbi.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <Navbar />
        {children}
        <Analytics />
        <Footer />
        <script src="https://webFeedbackBox.com/widget.js" data-widget-id="wfb_PowBPgitJ746GW7JqebQlBst" data-position="bottom-right" data-theme="default" data-type="emoji" data-language="en"></script>
      </body>
    </html>
  );
}
