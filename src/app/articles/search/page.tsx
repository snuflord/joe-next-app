import Search from "@/app/components/articles/Search"

export default function page() {
  return (
    <div className="mt-2 p-2 md:p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full container mx-auto">
      <Search />
    </div>
  )
}