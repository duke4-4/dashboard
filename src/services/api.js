import DB from './db';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Parcel Operations
  async getAllParcels() {
    await delay(500);
    return [...DB.parcels];
  },

  async getParcelById(id) {
    await delay(300);
    return DB.parcels.find(parcel => parcel.id === id);
  },

  async createParcel(parcelData) {
    await delay(500);
    const newParcel = {
      id: DB.parcels.length + 1,
      ...parcelData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    DB.parcels.push(newParcel);
    return newParcel;
  },

  async updateParcel(id, updates) {
    await delay(500);
    const index = DB.parcels.findIndex(parcel => parcel.id === id);
    if (index !== -1) {
      DB.parcels[index] = { ...DB.parcels[index], ...updates };
      return DB.parcels[index];
    }
    throw new Error('Parcel not found');
  },

  async deleteParcel(id) {
    await delay(500);
    const index = DB.parcels.findIndex(parcel => parcel.id === id);
    if (index !== -1) {
      DB.parcels.splice(index, 1);
      return true;
    }
    return false;
  },

  // User Operations
  async login(email, password, role) {
    await delay(300);
    const user = DB.users.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Invalid credentials');
  },

  // Admin Operations
  async getStats() {
    await delay(300);
    return {
      total: DB.parcels.length,
      pending: DB.parcels.filter(p => p.status === 'Pending').length,
      delivered: DB.parcels.filter(p => p.status === 'Received').length,
      revenue: DB.parcels.reduce((sum, p) => sum + (p.paymentStatus === 'Paid' ? p.amount : 0), 0)
    };
  },

  // Tracking Operations
  async trackParcel(referenceCode) {
    await delay(300);
    const parcel = DB.parcels.find(p => p.referenceCode === referenceCode);
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
  },

  // Search Operations
  async searchParcels(query) {
    await delay(300);
    return DB.parcels.filter(parcel => 
      parcel.referenceCode.toLowerCase().includes(query.toLowerCase()) ||
      parcel.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}; 