import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getVisibleTabs } from '../../utils/tabConfig';

export default function TabNavFooter({ activeTab, onTabChange }) {
  const { user } = useAuth();
  const visibleTabs = getVisibleTabs(user?.role);
  const currentIndex = visibleTabs.findIndex((t) => t.index === activeTab);
  const total = visibleTabs.length;

  const prev = currentIndex > 0 ? visibleTabs[currentIndex - 1].index : null;
  const next =
    currentIndex < total - 1 ? visibleTabs[currentIndex + 1].index : null;

  return (
    <div className="tab-nav-footer">
      <button
        className="btn-nav"
        disabled={prev === null}
        onClick={() => prev !== null && onTabChange(prev)}
      >
        &larr; Previous
      </button>
      <span className="tab-counter">
        Tab {currentIndex + 1} of {total}
      </span>
      <button
        className="btn-nav btn-nav-primary"
        disabled={next === null}
        onClick={() => next !== null && onTabChange(next)}
      >
        Next &rarr;
      </button>
    </div>
  );
}
