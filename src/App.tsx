import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './pages/Dashboard';
import { Directory } from './pages/Directory';
import { Jobs } from './pages/Jobs';
import { Events } from './pages/Events';
import { Mentorship } from './pages/Mentorship';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/directory"
            element={
              <ProtectedRoute>
                <Layout>
                  <Directory />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Layout>
                  <Jobs />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/mentorship"
            element={
              <ProtectedRoute>
                <Layout>
                  <Mentorship />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
