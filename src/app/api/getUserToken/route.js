import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function GET(req, res) {

    const nextCookies = cookies();
    const token = nextCookies.get('token')?.value;

    return NextResponse.json(token)
}