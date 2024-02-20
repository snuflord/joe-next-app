
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

    const res = await fetch(`${API_URL}/articles/?[populate]=*&pagination[limit]=10&[pagesize]=3&pagination[start]=0`)

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

    //   console.log(json)
   
      return json;
}
