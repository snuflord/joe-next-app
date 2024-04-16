import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { AuthProvider } from "../../../context/AuthContext"

export default function Layout ({ children }: { children: React.ReactNode }) {

    return (
      <>

        <main className="flex flex-col items-start px-2 md:px-0">
          
          <AuthProvider>

            <Navigation />
            <div className="w-full">{children}</div>
           
          </AuthProvider>
        
        </main>
        
        <Footer />
      </>
        
    )
}