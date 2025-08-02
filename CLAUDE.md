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

## Architecture

This is a React-based document viewer application with an InDesign-inspired interface for viewing pre-built document templates.

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
   - Takes up 70% of right sidebar height with scrollable content
4. **Page Checker Panel** (`src/components/PageChecker.tsx`) - Quality assurance tool that analyzes pages for:
   - **Font Size Issues**: Errors for text < 8px, warnings for 8-10px
   - **Contrast Problems**: Errors for contrast ratios < 3:1, warnings < 4.5:1 (WCAG AA)
   - **Layout Issues**: Content overflow detection, unused space analysis
   - **Print Safety**: Warns if content is within 20px of page edges
   - **Typography**: Line height checks (warns if ratio < 1.2)
   - **Image Quality**: Warns about low-resolution images
   - Takes up 30% of right sidebar height with collapsible interface
   - Shows summary counts (errors/warnings/info) in header
5. **Zoom Controls** - 25% increment zoom (25%-200%)
6. **Page Navigation** - Previous/Next buttons for multi-page documents
7. **Print/Export** - Browser-based printing with:
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