import { API_URL } from '../../../../config'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// THIS IS THE REGISTER API REQUEST

export async function POST(req, res) {

    const { username, email, password } = await req.json();

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })

    const data = await strapiRes.json()

    // console.log('api/register success!:', data)

    if(strapiRes.ok) {

        cookies().set({
            name: 'token',
            value: data.jwt,
            httpOnly: true,
        })
        
        revalidatePath('/dashboard')
        
        return NextResponse.json(data);

    } else {
        
        // console.log(`register failed response: ${data.error.message}`)

        return NextResponse.json(data)
    }
}