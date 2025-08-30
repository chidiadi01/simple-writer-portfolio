import * as cheerio from 'cheerio';

export function getImageURL(data: any): string {
    if (!data) return '/img-2.jpg'; 

    if (data?.metadata || data?.html) {
        const $ = cheerio.load(data?.html);
        const ogImage = $('meta[property="og:image"]').attr('content') || data?.metadata.image;
        return ogImage || '/img-2.jpg'; 
    }

    return '/img-2.jpg'; 
}