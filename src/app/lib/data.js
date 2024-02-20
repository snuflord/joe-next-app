// this separate file is used so that QS may be used

import QueryString from "qs";


export async function getFilteredArticles({query: {term}}) {

    const query = QueryString.stringify(
      {
        filters: {
          // the 'or' and 'contains' operators: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
          $or: [
            {
              name: {
                $contains: term,
              },
            },
            {
              performers: {
                $contains: term,
              },
            },
            {
              description: {
                $contains: term,
              },
            },
            {
              venue: {
                $contains: term,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

  const res = await fetch(`${API_URL}/articles?${query}&populate=*`);
  const data = await res.json();

  console.log(data)

  return data
}
