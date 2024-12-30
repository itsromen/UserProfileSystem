import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    communityEngagementPlatform: 'Community Engagement Platform',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
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
    communityEngagementPlatform: 'Plateforme d\'engagement communautaire',
    home: 'Accueil',
    profile: 'Profil',
    settings: 'Paramètres',
    settingsTitle: 'Paramètres',
    account: {
      title: 'Paramètres du compte',
      username: 'Nom d\'utilisateur',
      email: 'Email',
      password: 'Mot de passe'
    },
    preferences: {
      title: 'Préférences',
      theme: 'Thème d\'affichage',
      themes: {
        light: 'Clair',
        dark: 'Sombre'
      },
      language: 'Langue',
      languages: {
        english: 'Anglais',
        french: 'Français'
      },
      fontSize: 'Taille de police',
      fontSizes: {
        small: 'Petit',
        medium: 'Moyen',
        large: 'Grand'
      }
    },
    privacy: {
      title: 'Confidentialité',
      profileVisibility: 'Visibilité du profil',
      onlineStatus: 'Statut en ligne'
    },
    buttons: {
      save: 'Sauvegarder les modifications',
      goToProfile: 'Voir le profil'
    },
    alerts: {
      success: 'Paramètres mis à jour avec succès!',
      error: 'Une erreur est survenue lors de la sauvegarde des paramètres.'
    }
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};