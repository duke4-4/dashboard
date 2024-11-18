import React from 'react';
import { useParcels } from '../../context/ParcelContext';

function AdminParcels() {
  const { parcels } = useParcels();

  return (
    <div className="main-container">
      <div className="main-title">
        <h3 className="font-bold">MANAGE PARCELS</h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel.id} className="border-b">
                  <td className="px-4 py-2">{parcel.referenceCode}</td>
                  <td className="px-4 py-2">{parcel.name}</td>
                  <td className="px-4 py-2">{parcel.location}</td>
                  <td className="px-4 py-2">{parcel.status}</td>
                  <td className="px-4 py-2">{parcel.paymentStatus}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminParcels; 