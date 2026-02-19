"use client";

import Card from "@mui/material/Card";
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckboxForm } from "@/types/user";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from 'react-hook-form';

type Props = {
  element: CheckboxForm;
  removIt: (id: string) => void;
  header: (id: string, value: string) => void;
  isRequired: (id: string, value: boolean) => void;
  isPreview: boolean;
  updateOptions: (id: string, options: string[]) => void;
  control: Control<Record<string, any>>;
  errors: FieldErrors<Record<string, any>>;
};

export const CheckBoxInput = ({ element, removIt, header, isPreview, isRequired, updateOptions, control, errors}: Props) => {
  const fixHeader = element.header? element.header: "(Empty Header)";
  const headerText = fixHeader + (element.required ? " *" : "");
  const options = element.options ?? ["Option 1", "Option 2"];
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateOptions(element.id, newOptions);
  };
  const deleteOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    updateOptions(element.id, newOptions);
  }
  return (
    <div className = "flex items-center justify-center">
    <Card className = "p-10 w-full bg-gray-100">
      {/* Header */}
      <div className = "mb-4 flex">
          {isPreview ? (
            <span style = {{ fontWeight: 700, color: "black" }}>{headerText}</span>
          ) : (
            <TextField
              fullWidth
              placeholder = "New Checkbox Field"
              value = {element.header}
              onChange = {(e) => header(element.id, e.target.value)}
              variant = "standard"
              InputProps = {{
                readOnly: isPreview,
                disableUnderline: true,
                style: { fontWeight: "bold", color: "black" },
              }}
            />
          )}
        {!isPreview &&(
          <FormGroup>
            <FormControlLabel control = {<Checkbox disabled = {isPreview} onChange = {(e) => isRequired(element.id, e.target.checked)}
            checked = {element.required || false} />} label = "required" />
          </FormGroup>
        )}
        {!isPreview &&(
          <IconButton aria-label = "delete" onClick={() => removIt(element.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      {!isPreview && (
        <>
        <h2 className="mt-4 mb-2 font-semibold">Options:</h2>
        {options.map((option, index) => (
          <div key={`${element.id}-${index}`} className="flex items-center gap-2 mb-1">
            <TextField
              fullWidth
              placeholder= {`Option ${index + 1}`}
              color= "secondary"
              value= {option}
              onChange= {(e) => updateOption(index, e.target.value)}
            />
              <IconButton
                aria-label= "delete"
                onClick= {() => deleteOption(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
        ))}
        </>
      )}

      {isPreview && (
        <FormControl fullWidth error = {!!errors?.[element.id]}>
          <Controller
            name = {element.id}
            control = {control}
            rules = {{ required: element.required ? "This field is required" : false }}
            defaultValue = {[]}
            render = {({ field }) => (
              <>
                {options.map((opt, index) => (
                  <FormControlLabel
                    key = {`${element.id}-${index}`}
                    control = {
                      <Checkbox
                        checked = {field.value?.includes(opt) || false}
                        inputProps={{ "aria-required": element.required }}
                        onChange = {(e) => {
                          const newValue = e.target.checked
                            ? [...(field.value || []), opt]
                            : (field.value || []).filter((v: string) => v !== opt);
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label = {opt || `Option ${index + 1}`}
                  />
                ))}
              </>
            )}
          />

          <FormHelperText>
            {errors?.[element.id]?.message as string ?? " "}
          </FormHelperText>
        </FormControl>
      )}

      {!isPreview && (
        <Button variant = "outlined" className="mt-2" onClick={() => updateOptions(element.id, [...options, `Option ${options.length + 1}`])}
        sx={{ color: 'black', borderColor: 'black', height: 50, textTransform: "none"}}>
        Add Option
        </Button>
      )}
    </Card>
  </div>
  );
}
