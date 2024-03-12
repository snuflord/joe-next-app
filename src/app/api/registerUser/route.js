import { API_URL } from '../../../../config'
// https://github.com/jshttp/cookie

import { NextResponse } from 'next/server'

// import cookie from 'cookie'

import { cookies } from 'next/headers';

// THIS IS THE REGISTER API REQUEST

export async function POST(req, res) {

    const { username, email, password } = await req.json();

    console.log(`Here is the returned username: ${username}, email: ${email}, and password: ${password}`);

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
        
        cookies().set('token', data.jwt)
        
        return NextResponse.json(data);
    } else {
        // otherwise error
        // res.status(data.error.status).json({message: data.error.details})
    }
    
    return NextResponse.json(data);
}