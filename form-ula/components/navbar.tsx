"use client"

import Image from "next/image";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Save';
import { useRouter, usePathname } from 'next/navigation';

export const NavBar = () => {
    const router = useRouter(); 
    const isPreview = (usePathname() === "/PreviewForm" || usePathname() === "/Submission");
    return (
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
            <h1 className="font-bold items-center sm:text-3xl">Form Builder</h1>
          </div>
          {/* Save and Preview Button */}
          <div className="flex items-center gap-4 sm:w-auto sm:text-3xl">
            <Button variant="outlined" startIcon={<SendIcon/>} sx={{ color: 'black', borderColor: 'black' , fontSize: { xs: 10, lg: 16  } }}>
              <h1>Auto Save</h1>
            </Button>
            <Button variant="outlined" sx={{ color: 'black', borderColor: 'black', fontSize: { xs: 10, lg: 16  }}} onClick={() => router.push(isPreview? '/' :'/PreviewForm')}>
              <h1>{isPreview ? 'Back to Edit' : 'Preview Form'}</h1>
            </Button>
          </div>
        </div>
      </div>
    );
  }

