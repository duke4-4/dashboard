const express = import('express');
const fs = import('fs');
const cors = import('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to the JSON file
const filePath = './parcels.json';

// Get all parcels
app.get('/parcels', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file.');
    res.send(JSON.parse(data));
  });
});


app.put('/parcels/:id', (req, res) => {
  const parcelId = parseInt(req.params.id, 10);
  const updatedParcel = req.body;

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file.');

    const parcels = JSON.parse(data);
    const index = parcels.findIndex((parcel) => parcel.id === parcelId);

    if (index === -1) return res.status(404).send('Parcel not found.');

    parcels[index] = { ...parcels[index], ...updatedParcel };

    fs.writeFile(filePath, JSON.stringify(parcels, null, 2), (err) => {
      if (err) return res.status(500).send('Error writing file.');
      res.send(parcels[index]);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
