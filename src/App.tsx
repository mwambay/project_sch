import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Admin imports
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegisterResults from './pages/admin/RegisterResults';
import CorrectData from './pages/admin/CorrectData';
import ManageUsers from './pages/admin/ManageUsers';
import ManageSchools from './pages/admin/ManageSchools';
import ManageOptions from './pages/admin/ManageOptions';
import ManageClasses from './pages/admin/ManageClasses';
import ManageYears from './pages/admin/ManageYears';

// New unified interface imports
import HomePage from './pages/unified/HomePage';
import SchoolExplorer from './pages/unified/SchoolExplorer';
import PerformanceAnalytics from './pages/unified/PerformanceAnalytics';
import ComparisonTool from './pages/unified/ComparisonTool';
import Reports from './pages/unified/Reports';

// Components
import Layout from './components/Layout';
import UnifiedLayout from './components/UnifiedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role="admin">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="register-results" element={<RegisterResults />} />
            <Route path="correct-data" element={<CorrectData />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-schools" element={<ManageSchools />} />
            <Route path="manage-options" element={<ManageOptions />} />
            <Route path="manage-classes" element={<ManageClasses />} />
            <Route path="manage-years" element={<ManageYears />} />
          </Route>

          {/* Unified Public Interface */}
          <Route element={<UnifiedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<SchoolExplorer />} />
            <Route path="analytics" element={<PerformanceAnalytics />} />
            <Route path="compare" element={<ComparisonTool />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </UserProvider>
  );
}

export default App;