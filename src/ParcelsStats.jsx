import { Bar } from 'react-chartjs-2';

function ParcelStats() {
  const data = {
    labels: ['Sent', 'Received', 'Pending'],
    datasets: [
      {
        label: 'Parcel Stats',
        data: [20, 15, 5],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      },
    ],
  };

  return <Bar data={data} />;
}
export default ParcelStats;