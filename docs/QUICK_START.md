# Quick Start Guide

## Export a Template

1. Open any template
2. Click **📄 Export TSX**
3. Save the `.tsx` file

## Import a Template

### From File
1. Click **📥 Import Template**
2. Select "Upload File"
3. Choose your `.tsx` file

### From Code
1. Click **📥 Import Template**
2. Select "Paste TSX"
3. Paste your code and click Import

## Generate with AI

1. Click **🤖 Generate with AI**
2. Describe what you want
3. Review generated code
4. Click Import

## Template Format

```tsx
const Template = () => {
  return (
    <Document title="Title" type="flyer" paperSize="A4">
      <Page background="#ffffff" padding="40px">
        {/* Your content here */}
      </Page>
    </Document>
  );
};
```

## Available Props

### Document
- `title`: string
- `type`: "flyer" | "booklet" | "presentation"
- `paperSize`: "A3" | "A4" | "A5" | "Letter" | "Legal" | "Tabloid"

### Page
- `background`: color or gradient string
- `padding`: number or string (e.g., "40px")

## Style Example

```tsx
<div style={{
  fontSize: 24,
  color: '#333',
  marginBottom: 20,
  textAlign: 'center'
}}>
  Hello World
</div>
```

## Common Issues

**"X is not defined"**
- External dependencies need to be inlined
- Use only React, Document, and Page components

**"Invalid template structure"**
- Ensure you have Document > Page structure
- Component must be named "Template"

**"Compilation failed"**
- Check JSX syntax
- Remove TypeScript type annotations
- Use proper style objects