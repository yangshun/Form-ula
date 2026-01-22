"use client";

import Card from "@mui/material/Card";
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const CheckBox = () => {
  return (
    <div className="flex items-center justify-center">
    <Card className="p-10 w-full bg-gray-100">
      {/* Header */}
      <div className="mb-4 flex">
        <TextField
          fullWidth
          placeholder="New Text Field"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { fontWeight: 'bold'},
          }}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="required" />
        </FormGroup>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <TextField
          fullWidth
          placeholder="Follow the word above"
          InputProps={{
            disableUnderline: true,
            style: { fontWeight: 'bold'},
          }}
        />
    </Card>
  </div>
  );
}