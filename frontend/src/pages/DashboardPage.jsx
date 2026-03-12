import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Layout/Header';
import FormList from '../components/Dashboard/FormList';
import api from '../utils/api';

export default function DashboardPage() {
  const { getToken, user } = useAuth();
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = useCallback(async () => {
    try {
      const token = await getToken();
      const data = await api.listForms(token);
      setForms(data.forms || []);
    } catch (err) {
      console.error('Failed to load forms:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleNewForm = async () => {
    try {
      const token = await getToken();
      const result = await api.createForm(token);
      navigate(`/form/${result.formId}`);
    } catch (err) {
      alert('Failed to create form: ' + err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-toolbar">
          <h2>Review Forms</h2>
          {user?.role === 'requester' && (
            <button className="btn-new-form" onClick={handleNewForm}>
              + New Review Form
            </button>
          )}
        </div>
        <FormList forms={forms} loading={loading} />
      </div>
    </div>
  );
}
