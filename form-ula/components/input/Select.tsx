"use client";

import Card from "@mui/material/Card";
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectForm } from "@/types/user";
import { useState } from "react";

type Props = {
  element: SelectForm;
  removIt: (id: string) => void;
  header: (id: string, value: string) => void;
  content: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
  isPreview: boolean;
};

export const Select = ({ element, removIt, header, content, isPreview, isRequired }: Props) => {
  const [click , setClick] =  useState(false);
  const value = element.placeholder ?? "";
  const showError =
    isPreview && element.required && click && value.trim() === "";
  return (
    <div className="flex items-center justify-center">
    <Card className="p-10 w-full bg-gray-100">
      {/* Header */}
      <div className="mb-4 flex">
        <TextField
          fullWidth
          placeholder="New Select Field"
          value={element.header}
          onChange={(e) => header(element.id, e.target.value)}
          disabled={isPreview}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { fontWeight: 'bold'},
          }}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox disabled={isPreview} onChange={(e) => isRequired(element.id, e.target.checked)} 
          checked={element.required || false} />} label="required" />
        </FormGroup>
        <IconButton aria-label="delete" onClick={() => removIt(element.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <TextField
          fullWidth
          placeholder={element.header}
          value={element.placeholder}
          error={showError}
          helperText={showError ? "This field is required" : " "}
          onChange={(e) => { if (isPreview) setClick(true);
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