"use client"

import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TextForm, ParagraphForm, CheckboxForm, SelectForm } from "@/types/user";
import { CheckBoxInput } from "./CheckBoxInput";
import { Select } from "./Select";
import { Text } from "./Text";
import { Paragraph } from "./Paragraph";

type FormElement = TextForm | ParagraphForm | CheckboxForm | SelectForm;

type Props = {
  formElements: FormElement[];
  removIt: (id: string) => void;
  isPreview: boolean;
  header: (id: string, value: string) => void;
  content: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
};

export const RightSidebar = ({ formElements ,removIt, isPreview, header, content, isRequired}: Props) => {
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
          {formElements.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No form elements added yet. Use the left sidebar to add elements.</p>
            </div>) : (
              <div className="p-8">
                {formElements.map((element) => {
                  switch (element.type) {
                    case "text":
                      return <Text key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}/>;
                    case "paragraph":
                      return <Paragraph key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}/>;
                    case "checkbox":
                      return <CheckBoxInput key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}/>;
                    case "select":
                      return <Select key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}/>;
                    default:
                      return null;
                    }
                }
                )}                  
                </div>
              )}
            </Card>
          </div>
      );
    };

