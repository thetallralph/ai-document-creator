# Code Editor Implementation

## Overview
We've successfully implemented a code editor feature that allows users to edit document templates in real-time using Monaco Editor with JSX support.

## Key Components

### 1. CodeEditor Component (`src/components/CodeEditor.tsx`)
- Uses Monaco Editor for syntax highlighting and code editing
- Integrates Babel standalone for JSX transformation
- Handles real-time compilation with debouncing (1 second delay)
- Shows compilation status: "Compiling..." → "✓ Applied" or error messages

### 2. Source Code Loading (`src/utils/sourceCodeLoader.ts`)
- Dynamically loads actual document source files using Vite's `?raw` import
- Processes source code to replace style imports with inline styles
- Maps component names to their source files

### 3. DocumentViewer Integration
- Added toggle buttons for Visual/Code view modes
- Maintains edited component state separately from original
- Properly handles component rendering in both modes

## How It Works

1. **Source Loading**: When switching to code view, the actual source code is loaded from the document files
2. **Code Editing**: Users can edit the JSX code with full syntax highlighting
3. **Compilation**: After 1 second of no typing, Babel transforms JSX to JavaScript
4. **Live Preview**: The compiled component updates in real-time
5. **State Management**: Edits persist when switching between views

## Technical Implementation

### JSX Compilation Process
```javascript
1. Remove import statements
2. Transform JSX using Babel presets
3. Remove export keywords from transformed code
4. Wrap in function with React, Document, Page in scope
5. Evaluate and return the component function
```

### Key Features
- **Debounced Compilation**: Prevents excessive recompilation during typing
- **Error Handling**: Shows clear error messages for syntax errors
- **State Persistence**: Edits remain when switching views
- **Real Document Sources**: Shows actual component code, not templates

## Usage
1. Click "Code" button in toolbar to switch to code view
2. Edit the document code (JSX, styles, layout, etc.)
3. Wait for "✓ Applied" status
4. Switch back to "Visual" to see changes
5. Changes persist until navigating to a different document

## Dependencies
- `@monaco-editor/react`: Code editor component
- `@babel/standalone`: JSX transformation in the browser
- Vite raw imports: Loading source files as text

## Known Limitations
- Style imports are replaced with inline styles
- No TypeScript type checking in the editor
- Limited to editing existing documents (no new document creation)