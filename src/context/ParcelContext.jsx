import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ParcelContext = createContext();

export function ParcelProvider({ children }) {
  const [parcels, setParcels] = useState([
    {
      id: 1,
      referenceCode: 'REF123456',
      name: 'Jane Doe',
      location: 'Downtown',
      date: '2024-11-18',
      status: 'Pending',
      paymentStatus: 'Unpaid',
      amount: 100,
      float: 20
    },
    {
      id: 2,
      referenceCode: 'REF789012',
      name: 'John Smith',
      location: 'Uptown',
      date: '2024-11-18',
      status: 'Pending',
      paymentStatus: 'Unpaid',
      amount: 150,
      float: 30
    },
  ]);

  const addParcel = (parcel) => {
    const newParcel = {
      ...parcel,
      id: parcels.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      paymentStatus: parcel.paymentStatus || 'Unpaid'
    };
    setParcels([...parcels, newParcel]);
  };

  const updateParcel = (id, updates) => {
    setParcels(parcels.map(parcel => 
      parcel.id === id ? { ...parcel, ...updates } : parcel
    ));
  };

  return (
    <ParcelContext.Provider value={{ parcels, addParcel, updateParcel }}>
      {children}
    </ParcelContext.Provider>
  );
}

ParcelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useParcels() {
  return useContext(ParcelContext);
} 