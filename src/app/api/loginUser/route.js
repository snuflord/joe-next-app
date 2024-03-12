import { API_URL } from '../../../../config'

import cookie from 'cookie'

export default async (req, res) => {

    if(req.method === 'POST') {

        const { identifier, password } = req.body

        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await strapiRes.json()
        console.log('api/login:', data)

        if(strapiRes.ok) {

            res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', data.jwt, {
                    httpOnly: true,
                    // if equal to development, false. 
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    // accessible for everywhere around site in http header:
                    path: '/',
                })
              )

            res.status(200).json({user: data.user})
        } else {
            res.status(data.error.status).json({message: data.error.details})
        }

    
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}