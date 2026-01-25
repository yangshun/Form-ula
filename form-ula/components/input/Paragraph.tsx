"use client";

import Card from "@mui/material/Card";
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ParagraphForm } from "@/types/user";
import { useState } from "react";

type Props = {
  element: ParagraphForm;
  removIt: (id: string) => void;
  header: (id: string, value: string) => void;
  content: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
  isPreview: boolean;
  responses: Record<string, string>;
  setResponse: (id: string, value: string) => void;
};

export const Paragraph = ({ element, removIt, header, content, isPreview, isRequired, responses, setResponse}: Props) => {
  const headerText = element.header + (element.required ? " *" : "");
  const [click , setClick] =  useState(false);
  const value = element.placeholder ?? "";
  const showError =
    isPreview && element.required && click && value.trim() === "";

  return (
    <div className="flex items-center justify-center">
    <Card className="p-10 w-full bg-gray-100">
      {/* Header */}
      <div className="mb-4 flex">
      {isPreview ? (
          <span style={{ fontWeight: 700, color: "black" }}>{headerText}</span>
        ) : (
          <TextField
            fullWidth
            placeholder="New Paragraph Text"
            value={element.header} 
            onChange={(e) => header(element.id, e.target.value)}
            variant="standard"
            InputProps={{
              readOnly: isPreview,
              disableUnderline: true,
              style: { fontWeight: "bold", color: "black" },
            }}
          />
        )}
        {!isPreview &&( 
          <FormGroup>
            <FormControlLabel control={<Checkbox disabled={isPreview} onChange={(e) => isRequired(element.id, e.target.checked)} 
            checked={element.required || false} />} label="required" />
          </FormGroup>
        )}
        {!isPreview &&( 
          <IconButton aria-label="delete" onClick={() => removIt(element.id)}>
            <DeleteIcon />
          </IconButton>          
        )}
      </div>
      <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder={element.header}
          value={element.placeholder}
          color="secondary"
          error={showError}
          helperText={showError ? "This field is required" : " "}
          onChange={(e) => { if  (isPreview) {setClick(true); setResponse(element.id, e.target.value);}
            content(element.id, e.target.value);
          }}
          disabled={false} 
          InputProps={{
            style: { fontWeight: 'bold'},
          }}
        />
    </Card>
  </div>
  );
}