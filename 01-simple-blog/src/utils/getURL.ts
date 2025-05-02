import * as cheerio from 'cheerio';

export function getURL(data: any): string{
    if(!data) return 'url';

    if(data?.metadata || data?.html){
        const $ = cheerio.load(data?.html);
        const url = data?.metadata.url || $('meta[property="og:url"]').attr('content');
        return url;
    }
    return 'url';
}