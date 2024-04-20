import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/data');
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('doughnutChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.label),
        datasets: [{
          label: 'Analytics Data',
          data: data.map(item => item.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartRef.current = newChartInstance;
  }, [data]);

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  return (
    <div>
      <button 
        className="btn btn-primary btn-sm float-right mb-3"
        onClick={handleAddCustomer}
      >
        Add Tenants
      </button>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Pie Chart</h4>
              <canvas id="pieChart"></canvas>
            </div> 
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Doughnut chart</h4>
              <canvas id="doughnutChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
