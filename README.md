# Pagayi

Pagayi is a React-based document creation and viewing application with an InDesign-inspired interface. Create, view, export, and import professional document templates with support for AI-generated content.

## Features

### 📄 Document Templates
- **Pre-built Templates**: Professional flyers, catalogs, presentations, and booklets
- **Multiple Formats**: Support for A3, A4, A5, Letter, Legal, and Tabloid paper sizes
- **InDesign-style Interface**: Familiar panels for properties, pages, and layers

### 🎨 Document Viewer
- **Zoom Controls**: 25% to 200% zoom levels
- **Page Navigation**: Easy navigation for multi-page documents
- **Print Support**: Direct browser printing with proper formatting
- **Code Editor**: Live editing with Monaco Editor
  - Visual/Code view toggle
  - Real-time JSX compilation
  - Syntax highlighting
  - Instant preview updates
- **Quality Checker**: Automated checks for:
  - Font size issues
  - Contrast problems
  - Layout overflow
  - Print safety margins

### 📤 Export/Import System
- **Export as TSX**: Export templates as React/TypeScript files
- **Export as JSON**: Legacy format for data serialization
- **Import TSX Files**: Load exported templates back into the app
- **Paste TSX Code**: Import templates from clipboard

### 🤖 AI Integration
- **Generate with AI**: Create templates from natural language descriptions
- **LLM-Ready Format**: Templates use React as the templating language
- **Safe Execution**: Babel-based compilation with security validation
- **Editable Output**: Review and modify generated code before importing

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Basic Usage

1. **View Templates**: Browse pre-built templates on the home page
2. **Export a Template**: 
   - Open any template
   - Click "📄 Export TSX"
   - Save the file
3. **Import a Template**:
   - Click "📥 Import Template"
   - Upload a TSX file or paste code
4. **Generate with AI**:
   - Click "🤖 Generate with AI"
   - Describe your template
   - Import the generated code

## Template Structure

Templates follow this structure:

```tsx
const Template = () => {
  return (
    <Document title="My Document" type="flyer" paperSize="A4">
      <Page background="#ffffff" padding="40px">
        <h1 style={{ fontSize: 36, color: '#333' }}>
          Hello World
        </h1>
      </Page>
    </Document>
  );
};
```

### Component Props

**Document**
- `title`: Document title
- `type`: "flyer" | "booklet" | "presentation"
- `paperSize`: Paper size identifier

**Page**
- `background`: Color or gradient
- `padding`: Spacing around content

## Development

### Architecture

```
src/
├── components/
│   ├── document-components/  # Document, Page components
│   ├── DocumentViewer.tsx    # Main viewer interface
│   ├── DocumentList.tsx      # Template gallery
│   ├── ImportDialog.tsx      # Import functionality
│   └── TemplateGenerator.tsx # AI generation UI
├── documents/                # Pre-built templates
├── utils/
│   ├── reactTemplateCompiler.ts  # Babel compilation
│   ├── templateExporter.ts       # Export logic
│   └── llmIntegration.ts        # AI integration
└── contexts/                 # React contexts
```

### Key Technologies

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **@babel/standalone** for runtime compilation

### Security

The import system includes:
- Pattern validation to block dangerous code
- Sandboxed execution environment
- Component whitelist (React, Document, Page only)
- No access to window, document, or file system

## LLM Integration

To integrate with your LLM:

1. Update `src/utils/llmIntegration.ts`:
```typescript
export async function generateTemplateWithLLM(prompt: string) {
  const response = await yourLLMAPI.generate({
    prompt,
    systemPrompt: createTemplatePrompt(description)
  });
  return { code: response.text };
}
```

2. The system provides structured prompts to ensure valid output
3. Generated code is validated before execution

## Styling Guidelines

Always use inline React style objects:

```tsx
// ✅ Correct
<div style={{ fontSize: 24, marginBottom: 20 }}>

// ❌ Incorrect  
<div style="font-size: 24px; margin-bottom: 20px">
```

## Documentation

- [Export/Import Guide](docs/EXPORT_IMPORT_GUIDE.md) - Detailed export/import documentation
- [Quick Start](docs/QUICK_START.md) - Quick reference guide
- [CLAUDE.md](CLAUDE.md) - AI assistant instructions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the existing code style
4. Add tests if applicable
5. Submit a pull request

## License

MIT