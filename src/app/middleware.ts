// // app/api/middleware.ts

// import { NextRequest, NextResponse } from 'next/server';
// import // Modify the import based on your data layer

// export async function middleware(req: NextRequest) {
//   const userId = await getUser(req);
//   const articleId = req.page.params.id;

//   // Check if the user ID matches the article ID
//   if (userId !== articleId) {
//     return NextResponse.redirect('/');
//   }

//   return NextResponse.next();
// }

// // Add the middleware to your route
// export const config = {
//   matcher: ['/app/articles/[id]'],
// };