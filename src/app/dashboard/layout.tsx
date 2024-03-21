import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { AuthProvider } from "../../../context/AuthContext"

export default function Layout ({ children }: { children: React.ReactNode }) {

    return (
      <>

        <main className="flex min-h-screen flex-col items-start px-2 md:px-0 container mx-auto">
          
          <AuthProvider>

            <Navigation />
            <div className="w-full">{children}</div>
           
          </AuthProvider>
        
        </main>
        
        <Footer />
      </>
        
    )
}