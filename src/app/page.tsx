import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-lg md:text:2xl lg:text-5xl mb-5 font-bold">HOME</h1>
      <div className="bg-emerald-500 w-full md:w-1/3 h-96 rounded-2xl shadow-lg">
        <Link href='/login'>Log In</Link>
      </div>
      
    </main>
  );
}
