export type TextForm = {
  id: string;
  type: "text";
  required: boolean;
  header: string;
  placeholder: string;
};

export type ParagraphForm = {
  id: string;
  type: "paragraph";
  required: boolean;
  header: string;
  placeholder: string;
};

export type CheckboxForm = {
  id: string;
  type: "checkbox";
  required: boolean;
  header: string;
  placeholder: string;
  options: string[];
};

export type SelectForm = {
  id: string;
  type: "select";
  required: boolean;
  header: string;
  placeholder: string;
  options: string[];
};

export type FormElement = TextForm | ParagraphForm | CheckboxForm | SelectForm;

export type LeftSidebarProps = {
  addText: () => void;
  addParagraph: () => void;
  addCheckBox: () => void;
  addSelect: () => void;
};
