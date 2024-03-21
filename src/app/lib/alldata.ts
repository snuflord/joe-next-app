
import { API_URL } from "../../../config";



export async function getArticles({
    query,
    page = 1,
    limit = 10
  }: {
    query?: string
    page: number
    limit: number
  }) {

    const res = await fetch(`${API_URL}/articles/?[populate]=*&pagination[limit]=12&[pagesize]=3&pagination[start]=0`)

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    const json = await res.json();
    
    return json.data;
}

export async function getArticle(id: string) {

  const res = await fetch(`${API_URL}/articles/${id}?[populate]=*`)

  if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    const json = await res.json();
    return json;
}

export async function getUserArticles(id: string) {
  try {
    const response = await fetch(`${API_URL}/articles?associatedUser=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors here, such as logging or displaying an error message
    console.error('Error fetching articles:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

