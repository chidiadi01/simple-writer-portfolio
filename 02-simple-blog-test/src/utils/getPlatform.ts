import { getURL } from './getURL';

export function getPlatform(data: any): string {
    if (!data) return 'Platform1';
  
    const url = getURL(data);
  
    if (data?.html) {
      const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)\.(?:[a-zA-Z]{2,})/;
      const platform = url.match(regex);
      
  
      return platform?.[1].toUpperCase() || 'Platform2'; 
    }
  
    return 'Platform3';
  }
  