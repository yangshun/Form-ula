"use client"

import Image from "next/image";
import SaveIcon from '@mui/icons-material/Save';
import { useRouter, usePathname } from 'next/navigation';

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isPreview = pathname === "/PreviewForm" || pathname === "/Submission";
    return (
      <div className="flex border-b shadow-md border-gray-200">
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
          {/* Save status and Preview button */}
          <div className="flex items-center gap-4 sm:w-auto sm:text-3xl">
            {!isPreview && (
              <span className="flex items-center gap-1 text-sm text-gray-500 border border-gray-300 rounded px-3 py-2">
                <SaveIcon fontSize="small" />
                Auto-saved
              </span>
            )}
            <button
              className="flex items-center border border-black rounded px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
              onClick={() => router.push(isPreview ? '/' : '/PreviewForm')}
            >
              {isPreview ? 'Back to Edit' : 'Preview Form'}
            </button>
          </div>
        </div>
      </div>
    );
  }
