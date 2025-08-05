import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import { TemplateProvider } from './contexts/TemplateContext';
import { EditorCodeProvider } from './contexts/EditorCodeContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <TemplateProvider>
        <EditorCodeProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <DocumentList />
                </ProtectedRoute>
              } />
              <Route path="/documents/:documentName" element={
                <ProtectedRoute>
                  <DocumentViewer />
                </ProtectedRoute>
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Router>
        </EditorCodeProvider>
      </TemplateProvider>
    </AuthProvider>
  );
}

export default App;