import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import { TemplateProvider } from './contexts/TemplateContext';
import { EditorCodeProvider } from './contexts/EditorCodeContext';
import './App.css';

function App() {
  return (
    <TemplateProvider>
      <EditorCodeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DocumentList />} />
            <Route path="/documents/:documentName" element={<DocumentViewer />} />
            <Route path="/dynamic/:templateId" element={<DocumentViewer />} />
          </Routes>
        </Router>
      </EditorCodeProvider>
    </TemplateProvider>
  );
}

export default App;