# Form-ula
Take Home Assignment

## Technical Deep Dive

### Overview
This project is a lightweight **Form Builder** built with **Next.js**, **React** , **TypeScript**, **TailwindCSS**, and **MUI**. It supports a simple 3-step flow:

1. **HomePage (`/`)**: add and edit form elements (Text / Paragraph / Checkbox / Select).
2. **Preview (`/PreviewForm`)**: view the form in “fill mode” and submit.
3. **Submission (`/Submission`)**: show a success page and display what was submitted.

The core idea is that the UI is driven by a **form schema** (an array of element configs), and the renderer dynamically maps each element to its component based on `type`.

---

### Routing & Page Responsibilities (Next.js `app/`)
- `app/page.tsx` (**HomePage / Builder**)
  - Owns the schema state `formElements`
  - Provides handlers to add / update / delete elements
  - Persists schema to `localStorage` for autosave

- `app/PreviewForm/page.tsx` (**Preview**)
  - Loads the saved schema from `localStorage`
  - Reuses the same renderer components in a preview context (`isPreview=true`)

- `app/Submission/page.tsx` (**Submission**)
  - Reads `submittedData` from `localStorage`
  - Displays what was submitted

Navigation uses `next/navigation` (`router.push(...)`) between these routes.

---

### Data Model (TypeScript)
Form fields are represented as a discriminated union of types:

- `TextForm`
- `ParagraphForm`
- `CheckboxForm`
- `SelectForm`

All types share:
- `id: string` (unique identifier)
- `type: "text" | "paragraph" | "checkbox" | "select"`
- `required: boolean`
- `header: string`
- `placeholder: string`

This union design makes dynamic rendering clean and type-safe, since rendering is a `switch(element.type)`.

---

### State Management & Autosave
State is managed using `useState` and persisted using `localStorage`:

- `formElements` (schema)
  - Loaded on initial mount
  - Saved whenever elements change (local save)

- `formTitle` / `formDescription`
  - Stored in `localStorage` from the RightSidebar header fields

This allows the builder to preserve form configuration across refreshes without needing a backend.

---

### Dynamic Rendering Strategy
`RightSidebar` renders the form dynamically:

- Iterates through `formElements`
- Uses a `switch` on `element.type`
- Renders the corresponding component (`Text`, `Paragraph`, `CheckBoxInput`, `Select`)

This design scales well: adding a new field type usually means:
1) add a new union type
2) create a field component
3) add one `case` in the renderer

---

### Builder(Home Page) vs Preview Mode
Each field component supports two modes via an `isPreview` flag:

- **Builder mode (`isPreview=false`)**
  - edit header
  - toggle required
  - delete element

- **Preview mode (`isPreview=true`)**
  - display header as text
  - hide required/edit/delete controls
  - show submit button

This keeps UI consistent across pages by reusing the same core components.

---

### Submission & Current Data Handling
On submit, the app saves to `localStorage` and routes to `/Submission`.

**Current simplification:**  
To keep implementation lightweight, I temporarily store user inputs by writing into `element.placeholder` in preview mode. This allows the submission page to display answers without building a separate response map yet.

**Tradeoff:**  
This mixes *schema* (what the form is) with *responses* (what the user typed). It works for a demo but is not ideal long-term, especially when adding real placeholder hints, select options, checkbox groups, and stronger validation.

---

### Planned Refactor (Schema vs Responses Separation)
Next step is to split the data into:
- `formElements` = schema only (header, required, placeholder as hint, options, etc.)
- `responses: Record<string, any>` = user answers keyed by `element.id`

Then submission becomes:
```ts
{ formElements, responses, formTitle, formDescription }
