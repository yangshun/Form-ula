"use client";

import Image from "next/image";
import { NavBar } from "@/components/navbar";
import { Button, Card } from "@mui/material";

const Submission = () => { 
    return (    
      <main className="flex min-h-screen flex-col">
        <NavBar />
        {/* Body */}
        <div className="flex flex-col items-center p-6">
          <Card className="w-full max-w-3xl p-10 text-center">
          {/* Tick Logo */}
          <Image src="/accept.png" alt="Success" width={100} height={100} className="mx-auto my-6"/>
          {/* Text */}
          <h1 className="text-3xl font-bold">Form submitted successfully!</h1>
          <h2 className="text-lg text-gray-400">Thank you for your submittion</h2>
          {/* OutPut */}

          {/* Button to go back to editor/ preview */}  
            <Button variant="outlined" className="p-4"
              sx={{ color: 'black', borderColor: 'black', height: 50}}>
              <h1>Back to editor</h1>
            </Button>
            <Button variant="outlined" className="p-4"
              sx={{ color: 'black', borderColor: 'black', height: 50}}>
              <h1>Preview Form</h1>
            </Button>
          </Card>
        </div>
      </main>
    )
  }   
export default Submission;