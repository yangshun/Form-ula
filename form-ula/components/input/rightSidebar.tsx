"use client"

import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export const RightSidebar = () => {
  const [title, settitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const savedTitle = localStorage.getItem('formTitle');
    const savedDescription = localStorage.getItem('formDescription');
    if (savedTitle) {
      settitle(savedTitle);
    }
    if (savedDescription) {
      setDescription(savedDescription);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('formTitle', title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem('formDescription', description);
  }, [description]);
  
  return (
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
  );
}