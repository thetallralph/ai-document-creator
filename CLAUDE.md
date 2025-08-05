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
- **@anthropic-ai/sdk** for Claude AI integration
- **@mistralai/mistralai** for Mistral AI integration
- **@monaco-editor/react** for code editing
- **@babel/standalone** for runtime JSX compilation
- **@supabase/supabase-js** for authentication and database
- **@supabase/auth-ui-react** for authentication UI components

## Architecture

Pagayi is a React-based document viewer application with an InDesign-inspired interface for viewing pre-built document templates.

### Key Architectural Patterns

1. **Global State Management**:
   - `EditorCodeContext`: Centralized editor code state shared between code editor and AI assistant
   - `TemplateContext`: Dynamic template management
   - `AuthContext`: Authentication state management with Supabase integration
   - Eliminates prop drilling and ensures consistency

2. **Token-Efficient AI Integration**:
   - Page-by-page processing instead of full document
   - Utility functions for page extraction and replacement
   - 80-90% reduction in API token usage

3. **HTML Template System** (Replaced TSX compilation):
   - Plain HTML with inline styles for templates
   - No Babel compilation needed - direct HTML to React conversion
   - Faster editing with 300ms debounce (down from 1s)
   - Simpler for AI to understand and modify
   - Templates stored as JSON with HTML content per page

### Core Components

#### Navigation & Routing
- **App** (`src/App.tsx`): Main router setup with routes
  - `/` - Document list page (protected)
  - `/documents/[document-name]` - Individual document viewer (protected)
  - `/signin` - Sign in page
  - `/signup` - Sign up page
  - `/forgot-password` - Password reset request page
  - `/reset-password` - Password reset page

#### Main Components
- **DocumentList** (`src/components/DocumentList.tsx`): Grid display of all available document templates with user auth status
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
4. **AI Assistant Panel** (`src/components/AIAssistant.tsx`) - Chat-based AI document improvement interface:
   - **Connection Status**: Shows AI provider (Gemini/Claude/Mistral) connection status in header
   - **Context Selector**: 
     - Visual grid of page numbers for selecting which pages to include in AI context
     - Multiple pages can be selected for multi-page improvements
     - Current page highlighted with yellow border, selected pages in purple
     - Shows "Selected: X, Y | Current: Page Z" summary
   - **Chat Interface**:
     - Full conversation history showing all user requests and AI responses
     - Success messages show "✓ Successfully updated Page X" instead of raw code
     - Fixed input field at bottom for continuous access while scrolling
     - Enter to send, Shift+Enter for new line
     - Typing indicator while AI is processing
   - **Layout**:
     - Entire content area (context selector + chat history) is scrollable
     - Input field remains fixed at bottom with subtle shadow
     - Takes up 40% of right sidebar height
   - **Auto-apply**: Automatically applies changes when AI returns JSX content for single page
   - Requires API key in `.env` file based on selected provider
5. **Page Checker Panel** (`src/components/PageChecker.tsx`) - Quality assurance tool:
   - Located in left sidebar under Pages panel
   - **Font Size Issues**: Errors for text < 8px, warnings for 8-10px
   - **Contrast Problems**: Errors for contrast ratios < 3:1, warnings < 4.5:1 (WCAG AA)
   - **Layout Issues**: Content overflow detection, unused space analysis
   - **Print Safety**: Warns if content is within 20px of page edges
   - **Typography**: Line height checks (warns if ratio < 1.2)
   - **Image Quality**: Warns about low-resolution images
   - Shows summary counts (errors/warnings/info) in header
6. **Code Editor** (`src/components/HTMLCodeEditor.tsx`):
   - Live HTML editing with Monaco Editor
   - No compilation needed - direct HTML display
   - Page-specific editing - shows HTML for selected page only
   - Visual page selector in sidebar for switching between pages
   - @ mention system in AI Assistant for quick page selection
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

Templates are now stored as HTML in `src/templates/html-templates/`:
- **Simple Flyer** - Basic A4 flyer template
- **Outlet Sale Flyer** - A4 single-page promotional flyer with HTML
- **Multi-Page Booklet** - Example of multi-page HTML document
- **Test Template** - 6-page template for testing multi-page features

Templates are registered in `src/templates/html-templates/index.ts`.

Legacy TSX templates (deprecated) in `src/documents/`:
- **Outlet Product Catalog** (`outlet-catalog/`) - A4 multi-page catalog
- **Outlet Presentation** (`outlet-presentation/`) - 16:9 widescreen presentation
- **Cactuce Solutions Booklet** (`cactuce-booklet/`) - A5 8-page booklet
- **Plan d'Affaires - The Green Rooftop Parc** (`green-rooftop-business-plan/`) - 16:9 presentation (in French)

### Creating New HTML Templates
1. Create a new TypeScript file in `src/templates/html-templates/` (e.g., `myTemplate.ts`)
2. Define an HTMLTemplate object with pages array
3. Each page contains HTML content with inline styles
4. Export and register in `src/templates/html-templates/index.ts`

Example:
```typescript
import { HTMLTemplate } from '../../types/htmlTemplate';

export const myTemplateHTML: HTMLTemplate = {
  id: 'my-template',
  name: 'My Template',
  description: 'A simple template',
  paperSize: 'A4',
  pages: [
    {
      background: '#ffffff',
      content: `
        <h1 style="font-size: 32px; margin: 20px;">
          Hello World
        </h1>
        <p style="font-size: 16px; margin: 20px;">
          This is my HTML template.
        </p>
      `
    }
  ]
};
```

### UI/UX Design
- Dark theme inspired by Adobe InDesign
- Professional panels with clear hierarchy
- Custom scrollbars
- Smooth transitions and hover states
- Responsive layout with flexible sidebars

## AI Integration Setup

### LLM Provider Selection
The app supports Gemini, Claude, and Mistral AI models. Configure your preferred provider in `.env`:

```bash
# Choose between 'gemini', 'claude', or 'mistral' (default: gemini)
VITE_LLM_PROVIDER=gemini
```

### Gemini API Configuration
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env` file:
   ```
   VITE_GEMINI_API_KEY=your-api-key-here
   ```

### Claude Configuration

#### Option 1: Direct API (Development Only)
1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env` file:
   ```
   VITE_CLAUDE_API_KEY=your-api-key-here
   VITE_USE_CLAUDE_CODE_SDK=false
   ```
3. **Security Note**: This uses `dangerouslyAllowBrowser: true` and is only for development.

#### Option 2: Claude Code SDK via Backend (Recommended)
1. Install Claude CLI globally:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
2. Authenticate Claude CLI:
   ```bash
   claude login
   ```
3. Start the backend service:
   ```bash
   cd server
   npm install
   npm start
   ```
4. Configure `.env`:
   ```
   VITE_LLM_PROVIDER=claude
   VITE_USE_CLAUDE_CODE_SDK=true
   VITE_CLAUDE_BACKEND_URL=http://localhost:3001
   ```

The Claude Code SDK option provides access to Claude Pro/Max features through your local Claude CLI authentication.

### Mistral Configuration
1. Get an API key from [Mistral Console](https://console.mistral.ai/)
2. Add to `.env` file:
   ```
   VITE_MISTRAL_API_KEY=your-api-key-here
   ```
3. Optional: Use a specific Mistral agent:
   ```
   VITE_MISTRAL_AGENT_ID=your-agent-id-here
   ```
   When an agent ID is provided, the app will use the agent instead of the model for all AI operations.

### Model Selection (Optional)
You can specify which model to use:
```bash
# For Gemini: gemini-1.5-flash (default), gemini-1.5-pro
# For Claude: claude-3-sonnet-20240229 (default), claude-3-opus-20240229, claude-3-haiku-20240307
# For Mistral: mistral-small-latest (default), mistral-medium-latest, mistral-large-latest
VITE_LLM_MODEL=
```

The AI Assistant will show connection status in the panel header

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

#### HTML Template Processing
1. **Change Detection**:
   - User edits: Tracked via `handleContentChange`, debounced update after 300ms
   - AI changes: Detected when template updates externally
   - No compilation loops since no compilation needed
2. **Processing Flow**:
   - HTML parsed directly to React elements via `htmlToReact`
   - Page-specific editing - only selected page HTML shown
   - Real-time visual updates without compilation
3. **Status Indicators**:
   - "Updating..." during processing
   - "✓ Updated" when successful
   - Error messages for invalid HTML

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

## Authentication Setup

### Supabase Configuration
The app uses Supabase for authentication with support for email/password and Google OAuth.

#### Environment Variables
Add to your `.env` file:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### Get Your Supabase Credentials
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API
3. Copy your Project URL and anon/public key

#### Authentication Features
- **Email/Password Authentication**: Sign up, sign in, and password reset
- **Google OAuth**: Sign in with Google account
- **Protected Routes**: Document pages require authentication
- **Session Management**: Persistent sessions with auto-refresh
- **Auth Context**: Global authentication state management

#### Authentication Components
- **AuthContext** (`src/contexts/AuthContext.tsx`): Global auth state and user session management
- **Sign In** (`src/pages/SignIn.tsx`): Email/password and Google OAuth sign in
- **Sign Up** (`src/pages/SignUp.tsx`): New account creation with validation
- **Forgot Password** (`src/pages/ForgotPassword.tsx`): Request password reset email
- **Reset Password** (`src/pages/ResetPassword.tsx`): Set new password from email link
- **Protected Route** (`src/components/ProtectedRoute.tsx`): Route wrapper requiring authentication

#### Setting Up Google OAuth
1. Go to your Supabase dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials:
   - Client ID from Google Cloud Console
   - Client Secret from Google Cloud Console
5. Add redirect URLs in Google Cloud Console:
   - `https://your-project.supabase.co/auth/v1/callback`

#### Email Templates
Configure email templates in Supabase dashboard:
1. Go to Authentication > Email Templates
2. Customize templates for:
   - Confirmation emails
   - Password reset emails
   - Magic link emails

#### Authentication Flow
1. Unauthenticated users are redirected to `/signin`
2. After successful sign in, users return to their requested page
3. Sign out clears the session and redirects to sign in
4. Password reset sends email with secure reset link

## Recent Changes (2025-08-05)

### Migrated from TSX to HTML Templates
- **Motivation**: TSX compilation was complex and slow for LLMs to process
- **Implementation**: 
  - Replaced Babel compilation with direct HTML to React conversion
  - Templates now stored as JSON with HTML content per page
  - Reduced debounce from 1s to 300ms for faster updates
- **Benefits**:
  - Simpler for AI to understand and modify
  - No compilation errors
  - Faster editing experience
  - Easier to create new templates

### HTML Template Features
- **HTMLCodeEditor**: Page-specific HTML editing with Monaco
- **HTMLAIAssistant**: Updated to work with HTML templates
- **Page Navigation**: Visual page selector in sidebar
- **@ Mention System**: Quick page selection in AI chat
- **Export Options**: Export as JSON or HTML file

### Previous Changes (2025-08-04)

### Fixed Page Counting in AI Assistant
- **Issue**: AI Assistant showed only 4 pages instead of 8 for multi-page documents
- **Solution**: AI Assistant now receives page count from DocumentViewer's DOM query instead of parsing source code
- **Implementation**: DocumentViewer passes `totalPages={pages.length}` prop to AIAssistant
- **Result**: Both components now show consistent page counts

### Added @ Mention System for Page Selection
- **Feature**: Type `@` in chat input to quickly select pages for context
- **Usage**: 
  - `@` shows dropdown with all pages
  - `@2` filters to pages starting with 2
  - Arrow keys to navigate, Enter to select, Escape to close
- **Visual Indicators**: 
  - 👁️ for currently viewing page
  - ✓ for pages in context
- **Behavior**: Selected page is added to context and `@` is replaced with `@page1`, `@page2`, etc.

### Single Page Editing Mode
- **Change**: AI Assistant now only allows editing one page at a time (previously supported multiple)
- **UI Update**: Shows "Editing: Page X | Viewing: Page Y" instead of multiple selections
- **Behavior**: Clicking any page or using @ mention sets it as the only context page
- **Rationale**: Simplifies user experience and prevents confusion about which pages will be affected

### Added Supabase Authentication
- **Features**: Email/password and Google OAuth authentication
- **Components**: Sign in, sign up, password reset pages with dark theme styling
- **Protected Routes**: Document list and viewer pages require authentication
- **Auth Context**: Global authentication state management with session persistence
- **UI Updates**: User email display and sign out button in document list header