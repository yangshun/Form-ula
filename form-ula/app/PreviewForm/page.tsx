"use client";

import { NavBar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { RightSidebar } from "@/components/input/rightSidebar";
import {TextForm, ParagraphForm, CheckboxForm, SelectForm} from "@/types/user";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormElement = TextForm | ParagraphForm | CheckboxForm | SelectForm;

const PreviewFormPage = () => { 
  const router = useRouter(); 
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const {register, control, handleSubmit, formState: { errors }} = useForm<Record<string, any>>();
  const onSubmit = (data: Record<string, any>) => {
    console.log("SUBMIT DATA:", data); 
    sessionStorage.setItem("submittedData", JSON.stringify(data));
    sessionStorage.setItem("submittedFormElements", JSON.stringify(formElements));
    router.push("/Submission");
  };
  const content = (id: string, value:string) => {
    setFormElements(formElements.map((element) => {
      if (element.id === id) {
        return { ...element, placeholder: value };
      }
      return element;
    }))};
  const isRequired = (id: string, value:boolean) => {
    setFormElements(formElements.map((element) => {
      if (element.id === id) {
        return { ...element, required: value };
      }
      return element;
    }))};
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
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl px-8 py-6">
            <Button variant="outlined" className="p-4" startIcon={<ArrowBackIcon/>} onClick={() => router.push('/') } 
              sx={{ color: 'black', borderColor: 'black', height: 50}}>
              <h1>Back to editor</h1>
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RightSidebar formElements={formElements} removIt={() => {}} isPreview={true} header ={() => {}} content={content} isRequired={isRequired} register={register}
              errors={errors} updateOptions={() => {}} control={control}/>
            </form>
          </div>
        </div>
      </main>
    )
  }   
export default PreviewFormPage;