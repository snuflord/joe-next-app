
import { API_URL, NEXT_URL } from "../../../config";


export async function getArticles({
    query,
    page = 1,
    limit = 10
  }: {
    query?: string
    page: number
    limit: number
  }) {

    const res = await fetch(`${API_URL}/articles/?[populate]=*&pagination[limit]=12&[pagesize]=3&pagination[start]=0`,
      {cache: 'no-store' },
    )

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    const json = await res.json();
    
    return json.data;
}

export async function getArticle(id: string, revalidate = false) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? `${NEXT_URL}`
      : "https://your-live-website.com";

  if (revalidate) {
    await fetch(`${baseURL}/api/article/revalidateArticle`, {
      method: "POST",
    });
  }

  const res = await fetch(`${API_URL}/articles/${id}?[populate]=*`, { 
    headers: {
      'Next-Cache-Tags': 'article'
    },
    next: { tags: ['article'] },
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const json = await res.json();
  return json;
}


export async function getUserArticles(id: string) {
  try {
    
    const response = await fetch(`${API_URL}/articles?&pagination[limit]=6&filters[associatedUser][$eq]=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    return data;
  } catch (error) {
  
    console.error('Error fetching articles:', error);
    throw error; 
  }
}

