"use client";

import Card from "@mui/material/Card";
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ParagraphForm } from "@/types/user";
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

type Props = {
  element: ParagraphForm;
  removIt: (id: string) => void;
  header: (id: string, value: string) => void;
  content: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
  isPreview: boolean;
  register: UseFormRegister<Record<string, any>>;
  errors: FieldErrors<Record<string, any>>;
};

export const Paragraph = ({ element, removIt, header, content, isPreview, isRequired, register, errors}: Props) => {
  const fixHeader = element.header? element.header: "(Empty Header)";
  const headerText = fixHeader + (element.required ? " *" : "");
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
            placeholder="New textarea field"
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
      {isPreview ? (
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder={`Enter ${fixHeader}`}
          color="secondary"
          error={!!errors?.[element.id]}
          helperText={errors?.[element.id]?.message as string ?? " "}
          InputProps={{ style: { fontWeight: "bold" } }}
          inputProps={{ "aria-required": element.required }}
          {...register(element.id, {
            required: element.required ? "This field is required" : false,
          })}
        />
      ) : (
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder={`Enter ${fixHeader}`}
          value={element.placeholder}
          color="secondary"
          helperText=" "
          onChange={(e) => content(element.id, e.target.value)}
          InputProps={{ style: { fontWeight: "bold" } }}
        />
      )}
    </Card>
  </div>
  );
}
