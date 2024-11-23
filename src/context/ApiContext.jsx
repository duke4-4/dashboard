import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const apiService = {
    loading,
    error,
    getAllParcels: () => handleApiCall(api.getAllParcels),
    getParcelById: (id) => handleApiCall(api.getParcelById, id),
    createParcel: (data) => handleApiCall(api.createParcel, data),
    updateParcel: (id, updates) => handleApiCall(api.updateParcel, id, updates),
    deleteParcel: (id) => handleApiCall(api.deleteParcel, id),
    login: (email, password, role) => handleApiCall(api.login, email, password, role),
    getStats: () => handleApiCall(api.getStats),
    trackParcel: (code) => handleApiCall(api.trackParcel, code),
    searchParcels: (query) => handleApiCall(api.searchParcels, query),
  };

  return (
    <ApiContext.Provider value={apiService}>
      {children}
    </ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
} 