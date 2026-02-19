"use client"

import Card from '@mui/material/Card';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormElement } from "@/types/user";
import { CheckBoxInput } from "./CheckBoxInput";
import { Select } from "./Select";
import { Text } from "./Text";
import { Paragraph } from "./Paragraph";
import SendIcon from '@mui/icons-material/Send';
import type { UseFormRegister, Control, FieldErrors } from 'react-hook-form';

type Props = {
  formElements: FormElement[];
  removIt: (id: string) => void;
  isPreview: boolean;
  header: (id: string, value: string) => void;
  content: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
  updateOptions: (id: string, options: string[]) => void;
  register: UseFormRegister<Record<string, any>>;
  errors: FieldErrors<Record<string, any>>;
  control: Control<Record<string, any>>;
};

export const RightSidebar = ({ formElements ,removIt, isPreview, header, content, isRequired,
          register, errors, updateOptions, control}: Props) => {
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
              <div className="p-8 flex flex-col gap-6">
                {isPreview && formElements.some(el => el.required) && (
                  <p className="text-sm text-gray-500">* Required field</p>
                )}
                {formElements.map((element) => {
                  switch (element.type) {
                    case "text":
                      return <Text key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}
                           register={register} errors={errors}/>;
                    case "paragraph":
                      return <Paragraph key={element.id} element={element} removIt={removIt} header={header} content={content} isPreview={isPreview} isRequired={isRequired}
                           register={register} errors={errors}/>;
                    case "checkbox":
                      return <CheckBoxInput key={element.id} element={element} removIt={removIt} header={header} isPreview={isPreview} isRequired={isRequired}
                          updateOptions={updateOptions} control={control} errors={errors}/>;
                    case "select":
                      return <Select key={element.id} element={element} removIt={removIt} header={header} isPreview={isPreview} isRequired={isRequired}
                          updateOptions={updateOptions} control={control} errors={errors}/>;
                    default:
                      return null;
                    }
                }
                )}

                {isPreview &&(
                <Button variant = "contained" className = "mt-12" startIcon={<SendIcon/>}  color = "secondary" fullWidth type="submit"
                  sx = {{ color: 'white', height: 50}}>
                  Submit
                </Button>
                )}
            </div>
              )}
            </Card>
          </div>
      );
    };
