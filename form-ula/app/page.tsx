"use client";

// Components
import { NavBar } from "@/components/navbar";
import { LeftSidebar } from "@/components/leftSidebar";
import { RightSidebar } from "@/components/input/rightSidebar";
import { TextForm, ParagraphForm, CheckboxForm, SelectForm } from "@/types/user";
import { useEffect, useState } from "react";

type FormElement = TextForm | ParagraphForm | CheckboxForm | SelectForm;

const Home = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const deletion = (id: string) => {
    setFormElements(formElements.filter((element) => element.id !== id));
  } 
  useEffect(() => { 
    const save = localStorage.getItem('formElements');
    if (save) {
      setFormElements(JSON.parse(save));
    }
  }
, []);

  useEffect(() => {
    localStorage.setItem('formElements', JSON.stringify(formElements));
  } , [formElements]);

  const addText = () => {
    const newText: TextForm = {
      id: Date.now().toString(),
      type: "text",
      required: false,
      placeholder: "Enter text",
    };
    setFormElements([...formElements, newText]);
  };

  const addParagraph = () => {
    const newParagraph: ParagraphForm = {
      id: Date.now().toString(),
      type: "paragraph",
      required: false,
      placeholder: "Enter paragraph",
    };
    setFormElements([...formElements, newParagraph]);
  };

  const addCheckBox = () => {
    const newCheckbox: CheckboxForm = {
      id: Date.now().toString(),
      type: "checkbox",
      required: false,
      placeholder: "Enter checkbox",
    };
    setFormElements([...formElements, newCheckbox]);
  };

  const addSelect = () => {
    const newSelect: SelectForm = {
      id: Date.now().toString(),
      type: "select",
      required: false,
      placeholder: "Enter select",
    };
    setFormElements([...formElements, newSelect]);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header NavBar */}
      <NavBar />
      {/* Body */}
      <div
        className="grid md:grid-cols-[30%_70%]">
        {/* Left Sidebar */}
        <LeftSidebar addText={addText} addParagraph={addParagraph} addCheckBox={addCheckBox} addSelect={addSelect}/>
        {/* Right Sidebar */}
        <RightSidebar formElements={formElements} removIt={deletion} />
      </div>
    </main>
  );
}

export default Home;