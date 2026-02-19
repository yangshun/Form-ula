"use client";

// Components
import { NavBar } from "@/components/navbar";
import { LeftSidebar } from "@/components/leftSidebar";
import { RightSidebar } from "@/components/input/rightSidebar";
import { FormElement, TextForm, ParagraphForm, CheckboxForm, SelectForm } from "@/types/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  // Lazy initializer loads from localStorage on first render, eliminating the
  // visit/hasvisted guard pattern and the extra render cycle it caused.
  const [formElements, setFormElements] = useState<FormElement[]>(() => {
    try {
      const saved = localStorage.getItem('formElements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const {register, control, formState: { errors }} = useForm<Record<string, any>>();
  const deletion = (id: string) => {
    setFormElements(formElements.filter((element) => element.id !== id));
  };
  const header = (id: string, value:string) => {
    setFormElements(formElements.map((element) => {
      if (element.id === id) {
        return { ...element, header: value };
      }
      return element;
    }))};
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
  const updateOptions = (id: string, newOptions: string[]) => {
    setFormElements(formElements.map((element) => {
      if (element.id === id && (element.type === "select" || element.type === "checkbox")) {
        return { ...element, options: newOptions };
      }
      return element;
    }));
  };
  useEffect(() => {
    localStorage.setItem('formElements', JSON.stringify(formElements));
  }, [formElements]);

  const addText = () => {
    const newText: TextForm = {
      id: Date.now().toString(),
      type: "text",
      required: false,
      header: "",
      placeholder: ""
    };
    setFormElements([...formElements, newText]);
  };

  const addParagraph = () => {
    const newParagraph: ParagraphForm = {
      id: Date.now().toString(),
      type: "paragraph",
      required: false,
      header: "",
      placeholder: ""
    };
    setFormElements([...formElements, newParagraph]);
  };

  const addCheckBox = () => {
    const newCheckbox: CheckboxForm = {
      id: Date.now().toString(),
      type: "checkbox",
      required: false,
      header: "",
      placeholder: "",
      options: ["Option 1", "Option 2"]
    };
    setFormElements([...formElements, newCheckbox]);
  };

  const addSelect = () => {
    const newSelect: SelectForm = {
      id: Date.now().toString(),
      type: "select",
      required: false,
      header: "",
      placeholder: "",
      options: ["Option 1", "Option 2"]
    };
    setFormElements([...formElements, newSelect]);
  };

  return (
    <main className = "flex min-h-screen flex-col">
      {/* Header NavBar */}
      <NavBar />
      {/* Body */}
      <div
        className = "grid grid-cols-1 xl:grid-cols-[30%_70%]">
        {/* Left Sidebar */}
        <LeftSidebar addText={addText} addParagraph={addParagraph} addCheckBox={addCheckBox} addSelect={addSelect}/>
        {/* Right Sidebar */}
        <RightSidebar formElements={formElements} removIt={deletion} isPreview={false} header={header} content={content}
                isRequired={isRequired} register={register} updateOptions={updateOptions} errors={errors} control ={control}/>
      </div>
    </main>
  );
};    
export default Home;