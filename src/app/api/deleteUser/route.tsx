import { NextResponse } from 'next/server';
import { API_URL } from '../../../../config';
import { NextRequest } from 'next/server';

// DELETE USER
export async function POST(req: NextRequest) {
    const { userId, token } = await req.json();

    console.log(`Here is the deleteUser request: ${userId}, and token: ${token}`);

    const strapiRes = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { 
            Authorization: `Bearer ${token}`
        },
    });

    if (!strapiRes.ok) {
        console.log('error cannot delete');
        return NextResponse.json({ success: false, message: 'Error deleting user' }, { status: 500 });
    }

    console.log('user deleted');
    return NextResponse.json({ success: true });
}
