import * as cheerio from 'cheerio';

export function getTitle(data:any): string {
    if(!data) return 'Title Loading . . .';
    
    if (data?.html) {
        const $ = cheerio.load(data?.html);
        const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
        return ogTitle;
    }

        return 'The Title of The Article';
    }