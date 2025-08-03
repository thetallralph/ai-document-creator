# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot module replacement
- `npm run build` - Run TypeScript compiler and build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

### Dependencies
- **React 19** with TypeScript for UI
- **React Router** for navigation and document URLs
- **Vite** as build tool and dev server
- **@google/generative-ai** for Gemini AI integration
- **@monaco-editor/react** for code editing
- **@babel/standalone** for runtime JSX compilation

## Architecture

This is a React-based document viewer application with an InDesign-inspired interface for viewing pre-built document templates.

### Key Architectural Patterns

1. **Global State Management**:
   - `EditorCodeContext`: Centralized editor code state shared between code editor and AI assistant
   - `TemplateContext`: Dynamic template management
   - Eliminates prop drilling and ensures consistency

2. **Token-Efficient AI Integration**:
   - Page-by-page processing instead of full document
   - Utility functions for page extraction and replacement
   - 80-90% reduction in API token usage

3. **Reactive Compilation System**:
   - Real-time Babel compilation in browser
   - Debounced user input (1s delay)
   - Automatic detection of external changes (AI)
   - Prevents compilation loops with ref tracking

### Core Components

#### Navigation & Routing
- **App** (`src/App.tsx`): Main router setup with routes
  - `/` - Document list page
  - `/documents/[document-name]` - Individual document viewer

#### Main Components
- **DocumentList** (`src/components/DocumentList.tsx`): Grid display of all available document templates
- **DocumentViewer** (`src/components/DocumentViewer.tsx`): InDesign-inspired document viewer with:
  - Left sidebar: Document properties (including paper size) and page thumbnails
  - Center canvas: Zoomable document display
  - Right sidebar: Hierarchical layers panel
  - Page navigation controls

#### Document Components
- **Document** (`src/components/document-components/Document.tsx`): 
  - Wrapper component that defines document metadata
  - Accepts `paperSize` prop that references sizes from global config
  - Automatically passes dimensions to child Page components
- **Page** (`src/components/document-components/Page.tsx`): 
  - Container for page content with fixed dimensions
  - Inherits dimensions from Document or can override with explicit width/height
  - Uses a two-div structure: outer div maintains exact page size, inner div handles padding
  - Ensures consistent display and print output with no cropping

### Paper Size System

#### Configuration (`src/config/paperSizes.ts`)
Global paper size definitions including:
- ISO sizes: A3, A4, A5
- US sizes: Letter, Legal, Tabloid
- Digital formats: PRESENTATION_16_9, PRESENTATION_4_3
- Social media: INSTAGRAM_POST, INSTAGRAM_STORY

Each size includes width/height in pixels (72 DPI) and display name.

#### Usage in Documents
```tsx
<Document title="My Document" paperSize="A4">
  <Page background="#fff">
    {/* Content automatically sized to A4 */}
  </Page>
</Document>
```

### Document Viewer Features

1. **Document Properties Panel** - Shows document name, type, page count, paper size, and description
2. **Pages Panel** - Thumbnail grid for page navigation with active page highlighting
3. **Layers Panel** - Hierarchical view of all elements on the current page with:
   - Element type icons
   - Nested structure visualization
   - Selection highlighting
   - Takes up 60% of right sidebar height with scrollable content
4. **AI Assistant Panel** (`src/components/AIAssistant.tsx`) - AI-powered document improvement tools:
   - **Connection Status**: Shows Gemini AI connection status in header
   - **Manual Analysis**: Click "Analyze Document" for design suggestions (no auto-analysis)
   - **Improve Page Layout**: 
     - Always uses current code editor content via global context
     - Token-efficient: Only sends selected page content to AI
     - Directly updates editor code, triggering automatic recompilation
     - Optional user instructions for specific improvements
     - Real-time updates in both code editor and visual view
   - **Text Improvement**: Enhance clarity, conciseness, tone, or grammar
   - Takes up 40% of right sidebar height
   - Requires Gemini API key in `.env` file
5. **Page Checker Panel** (`src/components/PageChecker.tsx`) - Quality assurance tool:
   - Located in left sidebar under Pages panel
   - **Font Size Issues**: Errors for text < 8px, warnings for 8-10px
   - **Contrast Problems**: Errors for contrast ratios < 3:1, warnings < 4.5:1 (WCAG AA)
   - **Layout Issues**: Content overflow detection, unused space analysis
   - **Print Safety**: Warns if content is within 20px of page edges
   - **Typography**: Line height checks (warns if ratio < 1.2)
   - **Image Quality**: Warns about low-resolution images
   - Shows summary counts (errors/warnings/info) in header
6. **Code Editor** (`src/components/CodeEditor.tsx`):
   - Live TSX editing with Monaco Editor
   - Auto-compilation with Babel
   - Always loaded (even when viewing visual mode) for instant switching
   - Uses global EditorCodeContext for state management
   - Detects and compiles external changes (from AI) automatically
   - Changes reflected in real-time in visual mode
7. **Zoom Controls** - 25% increment zoom (25%-200%)
8. **Page Navigation** - Previous/Next buttons for multi-page documents
9. **Print/Export** - Browser-based printing with:
   - Print button in toolbar
   - Paper size automatically detected from document
   - Optimized print CSS with proper @page rules
   - Automatic page breaks for multi-page documents
   - Background colors/images preserved with print-color-adjust
   - Users can save as PDF via browser print dialog

### Document Templates

Current templates in `src/documents/`:
- **Outlet Sale Flyer** (`outlet-flyer/`) - A4 single-page promotional flyer
- **Outlet Product Catalog** (`outlet-catalog/`) - A4 multi-page catalog
- **Outlet Presentation** (`outlet-presentation/`) - 16:9 widescreen presentation
- **Cactuce Solutions Booklet** (`cactuce-booklet/`) - A5 8-page booklet presenting AssetiQ and DocuStruct solutions
- **Plan d'Affaires - The Green Rooftop Parc** (`green-rooftop-business-plan/`) - 16:9 presentation (in French) for an ecological urban park business plan in Benin

Templates are registered in `src/documents/templates.ts`.

### Creating New Documents
1. Create a new folder in `src/documents/` (e.g., `my-document/`)
2. Create a React component using Document and Page components
3. Specify paper size in Document component
4. Use regular HTML and inline styles for content
5. Export from index.tsx
6. Add to templates array in `src/documents/templates.ts`

Example:
```tsx
import { Document, Page } from '../../components/document-components';

export const MyDocument = () => {
  return (
    <Document title="My Document" type="flyer" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50 }}>
          Hello World
        </h1>
      </Page>
    </Document>
  );
};
```

### UI/UX Design
- Dark theme inspired by Adobe InDesign
- Professional panels with clear hierarchy
- Custom scrollbars
- Smooth transitions and hover states
- Responsive layout with flexible sidebars

## AI Integration Setup

### Gemini API Configuration
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the project root:
   ```
   VITE_GEMINI_API_KEY=your-api-key-here
   ```
3. The AI Assistant will show connection status in the panel header

### AI Features Implementation Details

#### Global Editor Code Context
- **EditorCodeContext** (`src/contexts/EditorCodeContext.tsx`): Global state management for editor code
- Code editor and AI assistant share the same code state
- Eliminates prop drilling and ensures consistency
- Both visual and code views are always rendered (hidden with CSS) for instant switching

#### Token-Efficient Page Improvement
1. **Page Extraction** (`src/utils/pageExtractor.ts`):
   - Extracts specific page by index from full document
   - Only sends page inner content to AI (not entire document)
   - Preserves Page component props and structure
2. **AI Processing** (`src/services/geminiService.ts`):
   - `improveSinglePage()`: Processes only one page's content
   - Reduces token usage by 80-90% compared to full document
   - Clear instructions about style syntax: `style={{ property: 'value' }}`
3. **Page Replacement**:
   - Replaces only the improved page in the document
   - Maintains document structure and other pages unchanged

#### Reactive Code Compilation
1. **Change Detection**:
   - User edits: Tracked via `handleCodeChange`, debounced compilation after 1s
   - AI changes: Detected when editor code changes externally
   - Prevents compilation loops with proper ref tracking
2. **Compilation Flow**:
   - Babel transforms TSX to JavaScript in browser
   - Component wrapped with Document/Page imports
   - Real-time visual updates without page reload
3. **Status Indicators**:
   - "Compiling..." during processing
   - "✓ Applied" when successful
   - Error messages for invalid code

#### Error Prevention
- AI instructed to use only standard HTML elements
- No imports or external dependencies in improved code
- Automatic detection if AI returns Page wrapper (extracts inner content)
- Style syntax validation: prevents triple braces `{{{`
- Proper quote escaping for text content (handles French apostrophes)

#### AI Prompt Structure
- Context-aware prompts based on user instructions
- When instructions provided: AI follows ONLY those instructions
- Without instructions: AI improves hierarchy, spacing, and design
- Critical style syntax requirements: always `style={{ ... }}` with double braces
- Page number context for multi-page documents