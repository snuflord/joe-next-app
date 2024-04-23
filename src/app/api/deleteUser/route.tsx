import { NextResponse } from 'next/server';
import { API_URL } from '../../../../config';

// DELETE USER

export async function POST(req: { json: () => PromiseLike<{ userId: string; token: any; }> | { userId: any; token: any; }; }, res: any) {

    const { userId, token } = await req.json();

    console.log(`Here is the deleteUser request: ${userId}, and token: ${token}`)

    const strapiRes = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { 
            Authorization: `Bearer ${token}`
          },
        })

        if(!strapiRes.ok) {

        // toast.error(data.message)
        console.log('error cannot delete')
        
        } else {
  
            console.log('user deleted')
        }
    
    
    return NextResponse.json({success: true});
}