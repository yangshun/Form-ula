"use client";
import Card from '@mui/material/Card';
import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';
import { useState } from 'react';
// Components
import { NavBar } from "@/components/navbar";
import { LeftSidebar } from "@/components/leftSidebar";


const Home = () => {
  const [title, settitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter(); 
  
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header NavBar */}
      <NavBar />
      {/* Body */}
      <div
        className="grid md:grid-cols-[30%_70%]">
        {/* Left Sidebar */}
        <LeftSidebar />
        {/* Right Sidebar */}
        <div className="p-8">
          <Card>
            {/* Header */}
            <div className="px-8 items-center bg-purple-100">
              <TextField
                fullWidth
                placeholder="Form Title"
                variant="standard"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: '30px' ,fontWeight: 'bold'},
                }}
              />
              <TextField
                fullWidth
                placeholder="Form Description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                }}
                />      
            </div>
            {/* Body */}
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">No form fields added yet. Use the panel on the left to add form elemets</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Home;