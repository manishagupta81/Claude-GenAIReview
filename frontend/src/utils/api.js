import config from '../config';

const BASE = config.apiUrl;

async function request(method, path, token, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }

  return data;
}

const api = {
  createForm: (token) => request('POST', '/forms', token),

  listForms: (token, cursor = null) => {
    const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : '';
    return request('GET', `/forms${qs}`, token);
  },

  getForm: (token, formId) => request('GET', `/forms/${formId}`, token),

  updateForm: (token, formId, body) =>
    request('PUT', `/forms/${formId}`, token, body),

  transitionStatus: (token, formId, action) =>
    request('POST', `/forms/${formId}/transition`, token, { action }),
};

export default api;
