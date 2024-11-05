
import './Dashboard.css'; 

const Dashboard = () => {
  return (
   <div className="dashboard">
      <header className="header flex justify-between">
        <h1 className="logo">Hot Courier Services</h1>
        <nav>
          {/* Add navigation links here */}
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Settings</a></li>
            <li><button style={{color: "orange"}} className="p-2 bg-white rounded-md">Logout</button></li>
          </ul>
        </nav>
      </header>

      <main className="main">
       <div className="card-container">
         <div className="card">
          <h3>Total Orders</h3>
          <p>1234</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>$123,456</p>
        </div>
        <div className="card">
          <h3>Active Deliveries</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Pending Deliveries</h3>
          <p>10</p>
        </div>
       </div>

        {/* Add more charts, tables, and other visualizations here */}
        <div className="chart">
          {/* Chart component (e.g., using a library like Chart.js or Recharts) */}
          <h3>Sales Over Time</h3>
          <div className="chart-container">

            


          </div>


          {/* Chart visualization */}
        </div>
      </main>
    </div>
  
  )
}

export default Dashboard;
