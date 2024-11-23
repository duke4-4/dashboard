const DB = {
  parcels: [
    {
      id: 1,
      referenceCode: 'REF123456',
      name: 'Jane Doe',
      location: 'Downtown',
      date: '2024-11-18',
      status: 'Pending',
      paymentStatus: 'Unpaid',
      amount: 100,
      float: 20,
      dispatchAddress: '123 Main St',
      phoneNumber: '+1234567890',
      description: 'Electronics',
      weight: '2.5',
      senderEmail: 'sender@example.com',
      receiverEmail: 'receiver@example.com',
      trackingHistory: [
        { date: '2024-11-18', status: 'Dispatched', location: '123 Main St' },
        { date: '2024-11-19', status: 'In Transit', location: 'Distribution Center' }
      ],
      lastUpdated: '2024-11-19'
    }
  ],

  users: [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User'
    },
    {
      id: 2,
      email: 'sender@example.com',
      password: 'sender123',
      role: 'sender',
      name: 'Sender User',
      sentParcels: ['REF123456']
    },
    {
      id: 3,
      email: 'receiver@example.com',
      password: 'receiver123',
      role: 'receiver',
      name: 'Receiver User',
      receivedParcels: ['REF123456']
    }
  ],

  parcelStats: {
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
    revenue: 0,
    dailyStats: {},
    monthlyStats: {}
  },

  notifications: [
    {
      id: 1,
      userId: 2,
      message: 'Your parcel REF123456 has been delivered',
      date: '2024-11-19',
      read: false
    }
  ],

  transactions: [
    {
      id: 1,
      parcelId: 1,
      amount: 100,
      type: 'Payment',
      status: 'Completed',
      date: '2024-11-18'
    }
  ],

  // Methods to update the database
  updateStats() {
    this.parcelStats = {
      total: this.parcels.length,
      pending: this.parcels.filter(p => p.status === 'Pending').length,
      inTransit: this.parcels.filter(p => p.status === 'In Transit').length,
      delivered: this.parcels.filter(p => p.status === 'Delivered').length,
      revenue: this.parcels.reduce((sum, p) => sum + (p.paymentStatus === 'Paid' ? p.amount : 0), 0)
    };

    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    this.parcelStats.dailyStats[today] = {
      sent: this.parcels.filter(p => p.date === today).length,
      delivered: this.parcels.filter(p => p.status === 'Delivered' && p.lastUpdated === today).length
    };

    // Update monthly stats
    const currentMonth = new Date().toISOString().slice(0, 7);
    this.parcelStats.monthlyStats[currentMonth] = {
      sent: this.parcels.filter(p => p.date.startsWith(currentMonth)).length,
      delivered: this.parcels.filter(p => 
        p.status === 'Delivered' && p.lastUpdated.startsWith(currentMonth)
      ).length,
      revenue: this.parcels
        .filter(p => p.date.startsWith(currentMonth))
        .reduce((sum, p) => sum + (p.paymentStatus === 'Paid' ? p.amount : 0), 0)
    };
  },

  addParcel(parcelData) {
    const newParcel = {
      id: this.parcels.length + 1,
      ...parcelData,
      trackingHistory: [{
        date: new Date().toISOString().split('T')[0],
        status: 'Dispatched',
        location: parcelData.dispatchAddress
      }],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.parcels.push(newParcel);
    this.updateStats();
    this.addNotification(parcelData.receiverEmail, `New parcel ${newParcel.referenceCode} has been sent to you`);
    return newParcel;
  },

  updateParcelStatus(id, status, location) {
    const parcel = this.parcels.find(p => p.id === id);
    if (parcel) {
      parcel.status = status;
      parcel.lastUpdated = new Date().toISOString().split('T')[0];
      parcel.trackingHistory.push({
        date: new Date().toISOString().split('T')[0],
        status,
        location
      });
      this.updateStats();
      this.addNotification(parcel.senderEmail, `Parcel ${parcel.referenceCode} status updated to ${status}`);
      this.addNotification(parcel.receiverEmail, `Parcel ${parcel.referenceCode} status updated to ${status}`);
    }
  },

  addNotification(userEmail, message) {
    const notification = {
      id: this.notifications.length + 1,
      userId: this.users.find(u => u.email === userEmail)?.id,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    this.notifications.push(notification);
  },

  addTransaction(parcelId, amount, type) {
    const transaction = {
      id: this.transactions.length + 1,
      parcelId,
      amount,
      type,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0]
    };
    this.transactions.push(transaction);
    this.updateStats();
  },

  getUserParcels(email) {
    const user = this.users.find(u => u.email === email);
    if (!user) return [];

    return this.parcels.filter(parcel => 
      user.role === 'sender' ? parcel.senderEmail === email : parcel.receiverEmail === email
    );
  },

  getParcelHistory(referenceCode) {
    const parcel = this.parcels.find(p => p.referenceCode === referenceCode);
    return parcel ? parcel.trackingHistory : [];
  }
};

export default DB; 