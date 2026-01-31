"use client"

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextIcon from '@mui/icons-material/TextFields';
import ParagraphIcon from '@mui/icons-material/Description';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SelectIcon from '@mui/icons-material/FormatListBulleted';
import { LeftSidebarProps } from '@/types/user';


export const LeftSidebar = ({addText, addParagraph, addCheckBox, addSelect}: LeftSidebarProps) => {
    return (    
        <div className="p-8">
        <Card className="p-6">
          {/* Card Header */}
          <h2 className="text-2xl font-bold mb-4">Add Form Elements</h2>
          {/* Card Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outlined" className="p-4" startIcon={<TextIcon/>} onClick={addText} 
              sx={{ color: 'black', borderColor: 'black', height: 60 , width: "100%", textTransform: "none"}}>
              <h1>Text</h1>
            </Button>
            <Button variant="outlined" className="p-4" startIcon={<ParagraphIcon/>} onClick={addParagraph} 
              sx={{ color: 'black', borderColor: 'black', height: 60 , width: "100%", textTransform: "none"}}>
              <h1>Paragraph</h1>
            </Button>
            <Button variant="outlined"className="p-4" startIcon={<CheckBoxIcon/>} onClick={addCheckBox} 
              sx={{ color: 'black', borderColor: 'black', height: 60 , width: "100%", textTransform: "none"}}>
              <h1>Checkbox</h1>
            </Button>
            <Button variant="outlined" className="p-4" startIcon={<SelectIcon/>} onClick={addSelect} 
              sx={{ color: 'black', borderColor: 'black', height: 60 , width: "100%", textTransform: "none"}}>
              <h1>Select</h1>
            </Button>
          </div>
        </Card>
      </div>
    );
}