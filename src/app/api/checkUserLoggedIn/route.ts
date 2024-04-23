// Import the API_URL from the correct path
import { API_URL } from '../../../../config';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

// USER API request - fired on useEffect CheckUserLoggedIn
export async function GET() {

  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;
  // console.log(`Here is the ${token}`)

  const strapiRes = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const user = await strapiRes.json();

  if (strapiRes.ok) { 

    // console.log(user)
    return NextResponse.json(user)

  } else {
    
    console.log('api>checkedloggedinuser: no user')
    return NextResponse.json(null)
  }
}


