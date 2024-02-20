import Search from "@/app/components/dashboard/search"

export default function page() {
  return (
    <div className="mt-2 p-5 shadow-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg w-full">
      <Search placeholder="Search all articles..."/>
    </div>
  )
}
