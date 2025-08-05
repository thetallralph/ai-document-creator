import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfileButton.css';

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ className }) => {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-button-container') && showMenu) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showMenu]);

  const handleSignOut = async () => {
    setShowMenu(false);
    await signOut();
  };

  return (
    <div className={`profile-button-container ${className || ''}`}>
      <button
        className="profile-button"
        onClick={() => setShowMenu(!showMenu)}
        title={user?.email || 'Account'}
      >
        {user?.email ? user.email.charAt(0).toUpperCase() : '?'}
      </button>
      
      {showMenu && (
        <div className="profile-menu">
          <div className="profile-menu-email">
            {user?.email}
          </div>
          <button
            className="profile-menu-signout"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};