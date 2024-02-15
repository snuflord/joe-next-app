import { revalidateTag } from "next/cache";

export function mySlugify(inputString: string) {
    // Convert white spaces to dashes
    let stringWithDashes = inputString.replace(/\s+/g, '-');
  
    // Convert capital letters to lowercase
    let finalString = stringWithDashes.toLowerCase();
  
    return finalString;
}

// export default async function revalidate() {
//   revalidateTag('/dashboard');
// }