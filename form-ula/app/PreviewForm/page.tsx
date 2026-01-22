import { NavBar } from "@/components/navbar";
import { RightSidebar } from "@/components/input/rightSidebar";

const PreviewFormPage = () => { 
    return (    
      <main className="flex min-h-screen flex-col">
        {/* Header */}
        <NavBar />
        {/* Body */}

        <div className="flex-grow flex items-center justify-center">
          <RightSidebar />
        </div>
        

      </main>
    )
  }   
export default PreviewFormPage;