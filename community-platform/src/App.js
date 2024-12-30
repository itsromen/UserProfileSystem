import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage';
import SetPasswordPage from './pages/SetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AuthProvider, { useAuth } from './context/AuthContext';
import LanguageProvider from './context/LanguageContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/tailwind.css';
import './styles/globals.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { darkMode, fontSize } = useTheme();
  const location = useLocation();

  return (
    <StyledThemeProvider theme={{ darkMode, fontSize }}>
      <GlobalStyles darkMode={darkMode} fontSize={fontSize} />
      <div className="App">
        {location.pathname !== '/login' && <Navbar />}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/profile-customization" element={
              <ProtectedRoute>
                <ProfileCustomizationPage />
              </ProtectedRoute>
            } />
            <Route path="/set-password" element={
              <ProtectedRoute>
                <SetPasswordPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
              <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile-customization"
                element={
                  <PrivateRoute>
                    <ProfileCustomizationPage />
                  </PrivateRoute>
                }
              />
            </Routes>
            <AppContent />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
