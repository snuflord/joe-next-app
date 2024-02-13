import Navigation from "../components/Navigation"

export default function Layout ({ children }: { children: React.ReactNode }) {

    return (
        <main className="flex min-h-screen flex-col items-start px-2 md:px-0 container mx-auto">
          
          <Navigation />
          <div className="w-full">{children}</div>
        
        </main>
    )
}