import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormProvider } from '../context/FormContext';
import { useForm } from '../hooks/useForm';
import Header from '../components/Layout/Header';
import TabBar from '../components/Layout/TabBar';
import ProgressBar from '../components/Layout/ProgressBar';
import TabNavFooter from '../components/Layout/TabNavFooter';
import { getVisibleTabs, canEditTab } from '../utils/tabConfig';

// Tab components
import Tab0Snapshot from '../components/Tabs/Tab0Snapshot';
import Tab1UseCase from '../components/Tabs/Tab1UseCase';
import Tab2Classification from '../components/Tabs/Tab2Classification';
import Tab3OptionA from '../components/Tabs/Tab3OptionA';
import Tab4OptionB from '../components/Tabs/Tab4OptionB';
import Tab5IP from '../components/Tabs/Tab5IP';
import Tab6Workforce from '../components/Tabs/Tab6Workforce';
import Tab7Regulatory from '../components/Tabs/Tab7Regulatory';
import Tab8RiskLibrary from '../components/Tabs/Tab8RiskLibrary';
import Tab9RiskDeclaration from '../components/Tabs/Tab9RiskDeclaration';
import Tab10Assessment from '../components/Tabs/Tab10Assessment';
import Tab11Decision from '../components/Tabs/Tab11Decision';

const TAB_COMPONENTS = {
  0: Tab0Snapshot,
  1: Tab1UseCase,
  2: Tab2Classification,
  3: Tab3OptionA,
  4: Tab4OptionB,
  5: Tab5IP,
  6: Tab6Workforce,
  7: Tab7Regulatory,
  8: Tab8RiskLibrary,
  9: Tab9RiskDeclaration,
  10: Tab10Assessment,
  11: Tab11Decision,
};

function FormPageInner() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadForm, loading, error, status } = useForm();
  const visibleTabs = getVisibleTabs(user?.role);
  const [activeTab, setActiveTab] = useState(visibleTabs[0]?.index || 0);

  useEffect(() => {
    if (formId) loadForm(formId);
  }, [formId, loadForm]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-screen">
          <div className="spinner" />
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="empty-state">
            <h3>Error</h3>
            <p>{error}</p>
            <button className="btn-nav" onClick={() => navigate('/')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TabComponent = TAB_COMPONENTS[activeTab];
  const readOnly = !canEditTab(user?.role, activeTab, status);

  return (
    <div>
      <Header />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="container">
        <ProgressBar />
        {TabComponent && <TabComponent readOnly={readOnly} />}
        <TabNavFooter activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

export default function FormPage() {
  return (
    <FormProvider>
      <FormPageInner />
    </FormProvider>
  );
}
