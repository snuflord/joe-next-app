import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  revalidateTag('article');
  revalidatePath('/dashboard')

  return new NextResponse("Revalidated the article collection.", {
    status: 200,
  });
}

export const config = {
    method: "POST",
  };
