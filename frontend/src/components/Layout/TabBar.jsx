import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getVisibleTabs } from '../../utils/tabConfig';

export default function TabBar({ activeTab, onTabChange }) {
  const { user } = useAuth();
  const visibleTabs = getVisibleTabs(user?.role);

  return (
    <div className="tab-bar">
      {visibleTabs.map((tab) => (
        <button
          key={tab.index}
          className={`tab-btn ${activeTab === tab.index ? 'active' : ''}`}
          onClick={() => onTabChange(tab.index)}
        >
          <span className={`tab-num tab-num-${tab.color}`}>{tab.index}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
