import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import '../css/Reports.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4081'];

const Reports = () => {
  const [specialtyData, setSpecialtyData] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'doctors'));
        const doctors = snapshot.docs.map(doc => doc.data());

        // Count specialities
        const specialtyCounts = {};
        const cityCounts = {};

        doctors.forEach(doctor => {
          specialtyCounts[doctor.speciality] = (specialtyCounts[doctor.speciality] || 0) + 1;
          cityCounts[doctor.city] = (cityCounts[doctor.city] || 0) + 1;
        });

        setSpecialtyData(Object.entries(specialtyCounts).map(([name, value]) => ({ name, value })));
        setCityData(Object.entries(cityCounts).map(([name, value]) => ({ name, value })));

      } catch (error) {
        console.error('Error fetching reports data:', error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <div className="reports">
      <h2>Doctor Reports</h2>

      <div className="chart-container">
        <h3>Specialty Ratio</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={specialtyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {specialtyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>City Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={cityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {cityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
