# Form-ula
Take Home Assignment

Form-ula is a lightweight **Google Forms–style form builder** built with **Next.js, React, TypeScript, Tailwind CSS, and MUI**.  
It supports a simple **3-step flow** driven entirely by a dynamic form schema.

## Flow Overview
1. **Home (`/`)** – Build the form by adding and editing fields  
2. **Preview (`/PreviewForm`)** – Fill and submit the generated form  
3. **Submission (`/Submission`)** – Display submission success and submitted data  

The UI is driven by a **form schema** (an array of element configs), and the renderer maps each element to its component based on `type`.

---

## Live Demo
🔥 **View Live Demo:** https://form-ula.vercel.app/

---

## Features
- Add form elements: **Text, Paragraph, Checkbox, Select**
- Edit field configs: label, required toggle, options (checkbox/select)
- Preview a fully working form generated from the schema
- Submit and view a success screen with submitted data
- Responsive UI for desktop and mobile

---

## Technical Overview

### State Management
React `useState` is used to manage all application state:
- `formElements`: array of form field configs (unique `id` via `crypto.randomUUID()`)
- `formTitle`, `formDescription`: top-level form metadata
- UI state: `isPreviewMode`, `isSubmitted`
- `submittedData`: captured form submission payload

All key state is persisted to **localStorage** to support autosave and cross-page navigation without a backend.

---

### Architecture
- **Component-based design** with clear separation of concerns:
  - Form builder (creation & editing)
  - Form preview (runtime rendering & validation)
  - Shared UI (navigation, success page)
- **Controlled components** in builder mode ensure real-time synchronization between editor and preview.
- **react-hook-form** is used in preview mode for form validation and submission handling.

---

### Dynamic Rendering
Form preview dynamically renders fields by iterating through `formElements` and switching on `element.type`:
- Text → `TextFieldPreview`
- Paragraph → `ParagraphPreview`
- Checkbox → `CheckboxGroupPreview`
- Select → `SelectPreview`

This approach keeps rendering logic simple and scalable when adding new field types.

---

## Project Structure

### Routing & Pages (Next.js `app/`)
- `app/page.tsx` (**Builder / Home**)
  - Owns `formElements` schema
  - Handles add / update / delete logic
  - Persists schema to `localStorage`

- `app/PreviewForm/page.tsx` (**Preview**)
  - Loads schema from `localStorage`
  - Renders form in fill mode using the same components

- `app/Submission/page.tsx` (**Submission**)
  - Reads submitted data from `localStorage`
  - Displays submission summary

Navigation is handled via `next/navigation` (`router.push`).

---

### Data Model (TypeScript)
Form fields are modeled as a **discriminated union**:
- `TextForm`
- `ParagraphForm`
- `CheckboxForm`
- `SelectForm`

Shared properties:
- `id: string`
- `type: "text" | "paragraph" | "checkbox" | "select"`
- `header: string`
- `required: boolean`
- `placeholder: string`

This design enables type-safe rendering using `switch(element.type)`.

---

### Builder vs Preview Mode
Each field component supports two modes via an `isPreview` flag:

**Builder Mode**
- Edit field labels
- Toggle required state
- Delete fields

**Preview Mode**
- Render read-only labels
- Collect user input
- Hide editing controls
- Enable submission

This allows reuse of the same components across pages while keeping logic centralized.

---

### Submission Handling & Tradeoff
On submission, user input is saved to `localStorage` and the app navigates to `/Submission`.

**Current simplification:**  
To keep the implementation lightweight, user input is temporarily stored in `element.placeholder` during preview.

**Tradeoff:**  
This mixes *schema* and *responses*, which works for a demo but is not ideal for long-term scalability.

---

### Planned Improvement
Next step is to separate concerns:
- `formElements` → schema only
- `responses: Record<string, any>` → user answers keyed by `element.id`

Proposed structure:
```ts
{
  formTitle,
  formDescription,
  formElements,
  responses
}
