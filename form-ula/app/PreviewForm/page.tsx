"use client";

import { NavBar } from "@/components/navbar";
import { useState } from "react";
import { RightSidebar } from "@/components/input/rightSidebar";
import { FormElement } from "@/types/user";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const PreviewFormPage = () => {
  const router = useRouter();
  // Read-only in preview: load once via lazy initializer, no setFormElements needed.
  const [formElements] = useState<FormElement[]>(() => {
    try {
      const saved = localStorage.getItem('formElements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const {register, control, handleSubmit, formState: { errors }} = useForm<Record<string, any>>();
  const onSubmit = (data: Record<string, any>) => {
    sessionStorage.setItem("submittedData", JSON.stringify(data));
    sessionStorage.setItem("submittedFormElements", JSON.stringify(formElements));
    router.push("/Submission");
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <NavBar />
      {/* Body */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-8 py-6">
          <Button variant="outlined" className="p-4" startIcon={<ArrowBackIcon/>} onClick={() => router.push('/') }
            sx={{ color: 'black', borderColor: 'black', height: 50}}>
            Back to editor
          </Button>
          {formElements.length === 0 ? (
            <div className="mt-8 text-center text-gray-500">
              <p className="mb-4">No form elements yet. Add some fields in the editor first.</p>
              <Button variant="contained" onClick={() => router.push('/')} color="secondary">
                Go to editor
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <RightSidebar formElements={formElements} removIt={() => {}} isPreview={true} header={() => {}} content={() => {}}
              isRequired={() => {}} register={register} errors={errors} updateOptions={() => {}} control={control}/>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
export default PreviewFormPage;
