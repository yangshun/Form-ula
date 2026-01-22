"use client";

import { NavBar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { RightSidebar } from "@/components/input/rightSidebar";
import {TextForm, ParagraphForm, CheckboxForm, SelectForm} from "@/types/user";

type FormElement = TextForm | ParagraphForm | CheckboxForm | SelectForm;

const PreviewFormPage = () => { 
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  
  useEffect(() => {
    const savedFormElements = localStorage.getItem('formElements');
    if (savedFormElements) {
      setFormElements(JSON.parse(savedFormElements));
    }
  }
, []);

    return (    
      <main className="flex min-h-screen flex-col">
        {/* Header */}
        <NavBar />
        {/* Body */}
        <div className="flex-grow flex items-center justify-center">
          <RightSidebar formElements={formElements} removIt={() => {}} isPreview={true}/>
        </div>
      </main>
    )
  }   
export default PreviewFormPage;