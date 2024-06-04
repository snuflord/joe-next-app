import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function GET(req, res) {

    try {

        const nextCookies = cookies();
        const token = nextCookies.get('token')?.value;
        return NextResponse.json(token)

    } catch (error) {
        console.log('No user signed in')
        throw new Error('No user signed in');
    }
}