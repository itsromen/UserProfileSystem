import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    saveButton: 'Save Password',
    saving: 'Saving...',
    cancel: 'Cancel',
    placeholders: {
      current: 'Enter your current password',
      new: 'Enter your new password',
      confirm: 'Confirm your new password'
    },
    alerts: {
      success: 'Password updated successfully!',
      mismatch: 'New passwords do not match.',
      invalidCurrent: 'Current password is incorrect.',
      error: 'An error occurred while updating password.'
    },
    requirements: {
      title: 'Password Requirements:',
      length: '• At least 8 characters long',
      uppercase: '• At least one uppercase letter',
      lowercase: '• At least one lowercase letter',
      number: '• At least one number',
      special: '• At least one special character'
    }
  },
  fr: {
    title: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le nouveau mot de passe',
    saveButton: 'Enregistrer le mot de passe',
    saving: 'Enregistrement...',
    cancel: 'Annuler',
    placeholders: {
      current: 'Entrez votre mot de passe actuel',
      new: 'Entrez votre nouveau mot de passe',
      confirm: 'Confirmez votre nouveau mot de passe'
    },
    alerts: {
      success: 'Mot de passe mis à jour avec succès!',
      mismatch: 'Les nouveaux mots de passe ne correspondent pas.',
      invalidCurrent: 'Le mot de passe actuel est incorrect.',
      error: 'Une erreur est survenue lors de la mise à jour du mot de passe.'
    },
    requirements: {
      title: 'Exigences du mot de passe:',
      length: '• Au moins 8 caractères',
      uppercase: '• Au moins une lettre majuscule',
      lowercase: '• Au moins une lettre minuscule',
      number: '• Au moins un chiffre',
      special: '• Au moins un caractère spécial'
    }
  }
};

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 3rem;
  background: ${props => props.theme.darkMode ? '#1e1e2f' : '#ffffff'};
  border-radius: 12px;
  box-shadow: 0 4px 6px ${props => props.theme.darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.darkMode ? '#e1e1e6' : '#4a4a4a'};
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.theme.darkMode ? '#2a2a3d' : '#e1e1e1'};
  border-radius: 8px;
  background: ${props => props.theme.darkMode ? '#2a2a3d' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  transition: all 0.3s ease;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px ${props => props.theme.darkMode ? 'rgba(74, 144, 226, 0.25)' : 'rgba(74, 144, 226, 0.15)'};
  }

  &:hover {
    border-color: ${props => props.theme.darkMode ? '#3a3a4d' : '#d1d1d1'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: ${props => props.secondary ? '0 1 auto' : '1 1 auto'};
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.secondary ? `
    background: transparent;
    border: 2px solid ${props.theme.darkMode ? '#3a3a4d' : '#e1e1e1'};
    color: ${props.theme.darkMode ? '#ffffff' : '#666666'};
    
    &:hover {
      background: ${props.theme.darkMode ? '#2a2a3d' : '#f5f5f5'};
    }
  ` : `
    background: #4a90e2;
    color: white;
    
    &:hover {
      background: #357abd;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Alert = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => {
    switch (props.type) {
      case 'error':
        return props.theme.darkMode ? '#ff4d4f20' : '#fff1f0';
      case 'success':
        return props.theme.darkMode ? '#52c41a20' : '#f6ffed';
      default:
        return props.theme.darkMode ? '#1e1e2f' : '#ffffff';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'error':
        return '#ff4d4f';
      case 'success':
        return '#52c41a';
      default:
        return props.theme.darkMode ? '#ffffff' : '#333333';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'error':
        return '#ff4d4f';
      case 'success':
        return '#52c41a';
      default:
        return props.theme.darkMode ? '#2a2a3d' : '#e1e1e1';
    }
  }};
`;

const Requirements = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme.darkMode ? '#2a2a3d' : '#f8f9fa'};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.darkMode ? '#e1e1e6' : '#666666'};
`;

const SetPasswordPage = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
    return Object.values(requirements).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('loggedInUserId');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.userid === userId);
    
    if (!user || user.password !== currentPassword) {
      setAlert({ type: 'error', message: t.alerts.invalidCurrent });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: t.alerts.mismatch });
      return;
    }

    if (!validatePassword(password)) {
      setAlert({ type: 'error', message: 'Please meet all password requirements.' });
      return;
    }

    setLoading(true);

    try {
      const updatedUsers = users.map(u => {
        if (u.userid === userId) {
          return { ...u, password };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setAlert({ type: 'success', message: t.alerts.success });
      
      setTimeout(() => {
        navigate('/settings');
      }, 2000);
    } catch (error) {
      setAlert({ type: 'error', message: t.alerts.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t.title}</Title>
      
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{t.currentPassword}</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={t.placeholders.current}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{t.newPassword}</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.placeholders.new}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{t.confirmPassword}</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t.placeholders.confirm}
            required
          />
        </FormGroup>

        <Requirements>
          <div>{t.requirements.title}</div>
          <div>{t.requirements.length}</div>
          <div>{t.requirements.uppercase}</div>
          <div>{t.requirements.lowercase}</div>
          <div>{t.requirements.number}</div>
          <div>{t.requirements.special}</div>
        </Requirements>

        <ButtonGroup>
          <Button type="submit" disabled={loading || !currentPassword || !password || !confirmPassword}>
            {loading ? t.saving : t.saveButton}
          </Button>
          <Button type="button" secondary onClick={() => navigate('/settings')}>
            {t.cancel}
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default SetPasswordPage;