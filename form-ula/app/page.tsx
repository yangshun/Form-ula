"use client";
import Image from "next/image";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import SendIcon from '@mui/icons-material/Save';
import TextIcon from '@mui/icons-material/TextFields';
import ParagraphIcon from '@mui/icons-material/Description';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SelectIcon from '@mui/icons-material/FormatListBulleted';
import { useRouter } from 'next/navigation';
import { Grid } from "@mui/material";


const Home = () => {
  const router = useRouter(); 
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header NavBar */}
      <div className="flex boder-b shadow-md border-gray-200">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4 px-8">
          {/* Logo and CompanyName */}
          <div className="flex gap-3 items-center">
            <Image
              src="/NavLogo.jpeg"
              alt="GreatFrontEnd Logo"
              width={35}
              height={35}
            />
            <h1 className="font-bold items-center text-3xl">Form Builder</h1>
          </div>
          {/* Save and Preview Button */}
          <div className="flex items-center gap-4">
            <Button variant="outlined" startIcon={<SendIcon/>} sx={{ color: 'black', borderColor: 'black'}}>
              <h1>Save</h1>
            </Button>
            <Button variant="outlined" sx={{ color: 'black', borderColor: 'black'}} onClick={() => router.push('/PreviewForm')}>
              Preview Form
            </Button>
          </div>
        </div>
      </div>
      {/* Body */}
      <div
        className="grid md:grid-cols-[30%_70%]">
        {/* Left Sidebar */}
        <div className="p-8">
          <Card className="p-6">
            {/* Card Header */}
            <h2 className="text-2xl font-bold mb-4">Add Form Elements</h2>
            {/* Card Buttons */}
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" className="p-4" startIcon={<TextIcon/>} 
                  sx={{ color: 'black', borderColor: 'black', height: 60 ,width: 150 }}>
                  <h1>Text</h1>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" className="p-4" startIcon={<ParagraphIcon/>}  
                  sx={{ color: 'black', borderColor: 'black', height: 60 ,width: 150 }}>
                  <h1>Paragraph</h1>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined"className="p-4" startIcon={<CheckBoxIcon/>} 
                  sx={{ color: 'black', borderColor: 'black', height: 60 ,width: 150 }}>
                  <h1>Checkbox</h1>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" className="p-4" startIcon={<SelectIcon/>}  
                  sx={{ color: 'black', borderColor: 'black', height: 60 ,width: 150 }}>
                  <h1>Select</h1>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </div>
        {/* Right Sidebar */}
        <div className="p-8">
          <Card>
            {/* Header */}
            <div className="p-8 items-center bg-purple-100">
              <h2 className="text-2xl font-bold">Form Title</h2>
              <p>Form Description.</p>
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