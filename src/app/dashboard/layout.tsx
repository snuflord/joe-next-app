import Navigation from "../components/Navigation"
import { AuthProvider } from "../../../context/AuthContext"

export default function Layout ({ children }: { children: React.ReactNode }) {

    return (
      <>

        <main className="flex flex-col items-start">
          
          <AuthProvider>

            <Navigation />
            <div className="w-full px-2 md:px-0">{children}</div>
           
          </AuthProvider>
        
        </main>

      </>
        
    )
}