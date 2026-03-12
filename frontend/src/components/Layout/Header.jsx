import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div>
        <h1>GenAI Governance Review</h1>
        <p>AI Risk Assessment &amp; Approval Portal</p>
      </div>
      <div className="header-right">
        <span className="header-user">
          {user?.username} ({user?.role})
        </span>
        <button className="btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
