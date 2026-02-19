"use client";

import Image from "next/image";
import { NavBar } from "@/components/navbar";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormElement } from "@/types/user";

type SubmittedState = {
  answers: Record<string, unknown>;
  formElements: FormElement[];
};

const Submission = () => {
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<SubmittedState | null>(null);
  useEffect(() => {
    const answersJson = sessionStorage.getItem("submittedData");
    const elementsJson = sessionStorage.getItem("submittedFormElements");
    if (answersJson && elementsJson) {
      setSubmittedData({
        answers: JSON.parse(answersJson),
        formElements: JSON.parse(elementsJson),
      });
    }
  }, []);
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
        <h2 className="text-lg text-gray-400">Thank you for your submission</h2>
        {/* Output */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
        {submittedData?.formElements?.map((el) => (
          <div key={el.id} className="text-left mb-3">
            <p className="font-semibold">{el.header}</p>
            <p>{String(submittedData?.answers?.[el.id] ?? "")}</p>
          </div>
        ))}
        </div>
        {/* Button to go back to editor / preview */}
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="contained" onClick={() => router.push('/')}
            sx={{ backgroundColor: "#eeeeee", color: "black", height: 50}}>
            Back to editor
          </Button>
          <Button variant="contained" onClick={() => router.push('/PreviewForm')} color="secondary"
            sx={{ height: 50}}>
            Preview Form
          </Button>
        </div>
        </Card>
      </div>
    </main>
  )
}
export default Submission;
