import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navigate, useNavigate } from 'react-router-dom';

const translations = {
  en: {
    settingsTitle: 'Settings',
    account: {
      title: 'Account Settings',
      username: 'Username',
      email: 'Email',
      password: 'Password'
    },
    preferences: {
      title: 'Preferences',
      theme: 'Display Theme',
      themes: {
        light: 'Light',
        dark: 'Dark'
      },
      language: 'Language',
      languages: {
        english: 'English',
        french: 'French'
      },
      fontSize: 'Font Size',
      fontSizes: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
      }
    },
    privacy: {
      title: 'Privacy',
      profileVisibility: 'Profile Visibility',
      onlineStatus: 'Online Status'
    },
    buttons: {
      save: 'Save Changes',
      goToProfile: 'View Profile'
    },
    alerts: {
      success: 'Settings updated successfully!',
      error: 'An error occurred while saving settings.'
    }
  },
  fr: {
    // (same structure as English translations)
  }
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background: ${props => props.theme.darkMode ? '#2a2a3d' : '#ffffff'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h2`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.darkMode ? '#3a3a4d' : '#eaeaea'};
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.darkMode ? '#3a3a4d' : '#dddddd'};
  border-radius: 4px;
  background: ${props => props.theme.darkMode ? '#1e1e2f' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.darkMode ? '#3a3a4d' : '#dddddd'};
  border-radius: 4px;
  background: ${props => props.theme.darkMode ? '#1e1e2f' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#333333'};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #4a90e2;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #4a90e2;
    color: white;
    
    &:hover {
      background: #357abd;
    }
  ` : `
    background: transparent;
    color: ${props.theme.darkMode ? '#ffffff' : '#333333'};
    border: 1px solid ${props.theme.darkMode ? '#3a3a4d' : '#dddddd'};
    
    &:hover {
      background: ${props.theme.darkMode ? '#3a3a4d' : '#f5f5f5'};
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Alert = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'error' ? '#ff4d4f20' : '#52c41a20'};
  color: ${props => props.type === 'error' ? '#ff4d4f' : '#52c41a'};
  border: 1px solid ${props => props.type === 'error' ? '#ff4d4f' : '#52c41a'};
`;

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, language, setLanguage } = useLanguage();  
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    account: {
      username: '',
      email: '',
      password: ''
    },
    preferences: {
      theme: darkMode ? 'dark' : 'light',
      language: language || 'en',
      fontSize: 'medium'
    },
    privacy: {
      profileVisibility: true,
      onlineStatus: true
    }
  });
  
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserSettings = () => {
      try {
        const userId = localStorage.getItem('loggedInUserId');
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.userid === userId);

        if (user) {
          setSettings({
            account: {
              username: user.username || '',
              email: user.email || '',
              password: ''
            },
            preferences: {
              theme: user.profile?.preferences?.displayTheme?.toLowerCase() || 'light',
              language: user.profile?.preferences?.language || 'en',
              fontSize: user.profile?.preferences?.fontSize || 'medium'
            },
            privacy: {
              profileVisibility: user.profile?.privacy?.profileVisibility ?? true,
              onlineStatus: user.profile?.privacy?.onlineStatus ?? true
            }
          });
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
        showAlert('error', t.alerts.error);
      }
    };

    loadUserSettings();
  }, []); 

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));

    if (category === 'preferences') {
      if (setting === 'theme') {
        toggleDarkMode();
      }
      if (setting === 'language' && setLanguage) {
        setLanguage(value);
        localStorage.setItem('languagePreference', value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('loggedInUserId');
      const users = JSON.parse(localStorage.getItem('users'));
      const userIndex = users.findIndex(user => user.userid === userId);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          username: settings.account.username,
          email: settings.account.email,
          profile: {
            ...users[userIndex].profile,
            preferences: {
              displayTheme: settings.preferences.theme === 'dark' ? 'Dark' : 'Light',
              language: settings.preferences.language,
              fontSize: settings.preferences.fontSize
            },
            privacy: {
              ...users[userIndex].profile.privacy,
              profileVisibility: settings.privacy.profileVisibility,
              onlineStatus: settings.privacy.onlineStatus,
              lastOnline: new Date().toISOString()
            }
          }
        };

        localStorage.setItem('users', JSON.stringify(users));
        showAlert('success', t.alerts.success);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showAlert('error', t.alerts.error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate('/set-password');
  };

  return (
    <Container>
      {alert && (
        <Alert type={alert.type}>{alert.message}</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardTitle>{t.account.title}</CardTitle>
          <FormGroup>
            <Label htmlFor="username">{t.account.username}</Label>
            <Input
              id="username"
              value={settings.account.username}
              onChange={(e) => handleSettingChange('account', 'username', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">{t.account.email}</Label>
            <Input
              id="email"
              type="email"
              value={settings.account.email}
              onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
            />
          </FormGroup>
        </Card>

        <Card>
          <CardTitle>{t.preferences.title}</CardTitle>
          <FormGroup>
            <Label htmlFor="theme">{t.preferences.theme}</Label>
            <Select
              id="theme"
              value={settings.preferences.theme}
              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
            >
              <option value="light">{t.preferences.themes.light}</option>
              <option value="dark">{t.preferences.themes.dark}</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="language">{t.preferences.language}</Label>
            <Select
              id="language"
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
            >
              <option value="en">{t.preferences.languages.english}</option>
              <option value="fr">{t.preferences.languages.french}</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fontSize">{t.preferences.fontSize}</Label>
            <Select
              id="fontSize"
              value={settings.preferences.fontSize}
              onChange={(e) => handleSettingChange('preferences', 'fontSize', e.target.value)}
            >
              <option value="small">{t.preferences.fontSizes.small}</option>
              <option value="medium">{t.preferences.fontSizes.medium}</option>
              <option value="large">{t.preferences.fontSizes.large}</option>
            </Select>
          </FormGroup>
        </Card>

        <Card>
          <CardTitle>{t.privacy.title}</CardTitle>
          <FormGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="profileVisibility">{t.privacy.profileVisibility}</Label>
              <Switch>
                <input
                  type="checkbox"
                  id="profileVisibility"
                  checked={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.checked)}
                />
                <span />
              </Switch>
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="onlineStatus">{t.privacy.onlineStatus}</Label>
              <Switch>
                <input
                  type="checkbox"
                  id="onlineStatus"
                  checked={settings.privacy.onlineStatus}
                  onChange={(e) => handleSettingChange('privacy', 'onlineStatus', e.target.checked)}
                />
                <span />
              </Switch>
            </div>
          </FormGroup>
        </Card>

        <ButtonGroup>
          <Button type="submit" primary disabled={loading}>
            {loading ? 'Saving...' : t.buttons.save}
          </Button>
          <Button type="button" onClick={() => navigate('/set-password')}>
            Change Password
          </Button>
        </ButtonGroup>

      </form>
    </Container>
  );
};

export default SettingsPage;