import React, { createContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

export const FormContext = createContext(null);

const initialState = {
  formId: null,
  status: 'DRAFT',
  formData: {},
  riskLibrary: {},
  reviewerAssessment: {},
  approverDecision: {},
  loading: false,
  saving: false,
  error: null,
  lastSaved: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'LOAD_FORM':
      return {
        ...state,
        formId: action.payload.formId,
        status: action.payload.status || 'DRAFT',
        formData: action.payload.formData || {},
        riskLibrary: action.payload.riskLibrary || {},
        reviewerAssessment: action.payload.reviewerAssessment || {},
        approverDecision: action.payload.approverDecision || {},
        loading: false,
        error: null,
      };
    case 'UPDATE_FIELD': {
      const { section, field, value } = action.payload;
      return {
        ...state,
        [section]: {
          ...state[section],
          [field]: value,
        },
      };
    }
    case 'UPDATE_RISK': {
      const { riskId, data } = action.payload;
      return {
        ...state,
        riskLibrary: {
          ...state.riskLibrary,
          [riskId]: {
            ...state.riskLibrary[riskId],
            ...data,
          },
        },
      };
    }
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SAVING':
      return { ...state, saving: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { getToken } = useAuth();
  const saveTimer = useRef(null);
  const pendingSave = useRef(false);

  // Auto-save with 2-second debounce
  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    pendingSave.current = true;
    saveTimer.current = setTimeout(async () => {
      if (!state.formId || !pendingSave.current) return;
      try {
        dispatch({ type: 'SET_SAVING', payload: true });
        const token = await getToken();
        await api.updateForm(token, state.formId, {
          formData: state.formData,
          riskLibrary: state.riskLibrary,
          reviewerAssessment: state.reviewerAssessment,
          approverDecision: state.approverDecision,
        });
        pendingSave.current = false;
        dispatch({ type: 'SET_LAST_SAVED', payload: new Date().toISOString() });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Auto-save failed' });
      } finally {
        dispatch({ type: 'SET_SAVING', payload: false });
      }
    }, 2000);
  }, [state.formId, state.formData, state.riskLibrary, state.reviewerAssessment, state.approverDecision, getToken]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const loadForm = useCallback(async (formId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const token = await getToken();
      const data = await api.getForm(token, formId);
      dispatch({ type: 'LOAD_FORM', payload: { formId, ...data } });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [getToken]);

  const updateField = useCallback((section, field, value) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { section, field, value } });
    scheduleSave();
  }, [scheduleSave]);

  const updateRisk = useCallback((riskId, data) => {
    dispatch({ type: 'UPDATE_RISK', payload: { riskId, data } });
    scheduleSave();
  }, [scheduleSave]);

  const transitionStatus = useCallback(async (action) => {
    try {
      dispatch({ type: 'SET_SAVING', payload: true });
      const token = await getToken();
      const result = await api.transitionStatus(token, state.formId, action);
      dispatch({ type: 'SET_STATUS', payload: result.newStatus });
      return result;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, [state.formId, getToken]);

  return (
    <FormContext.Provider
      value={{
        ...state,
        dispatch,
        loadForm,
        updateField,
        updateRisk,
        transitionStatus,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
