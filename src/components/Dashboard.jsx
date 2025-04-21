import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [specialties, setSpecialties] = useState(new Set());
  const [suspendedCount, setSuspendedCount] = useState(0);
  const [cityCounts, setCityCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'doctors'));
      const docs = snapshot.docs.map(doc => doc.data());

      setTotalDoctors(docs.length);

      const specialtiesSet = new Set();
      const cityMap = {};
      let suspended = 0;

      docs.forEach(doc => {
        if (doc.specialty) specialtiesSet.add(doc.specialty);
        if (doc.status === 'suspended') suspended++;
        if (doc.city) {
          cityMap[doc.city] = (cityMap[doc.city] || 0) + 1;
        }
      });

      setSpecialties(specialtiesSet);
      setSuspendedCount(suspended);
      setCityCounts(cityMap);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div>Total Doctors: {totalDoctors}</div>
        <div>Total Specialties: {specialties.size}</div>
        <div>Suspended: {suspendedCount}</div>
      </div>

      <div className="overview">
        <h3>City Breakdown:</h3>
        {Object.entries(cityCounts).length > 0 ? (
          <ul>
            {Object.entries(cityCounts).map(([city, count]) => (
              <li key={city}>{city}: {count}</li>
            ))}
          </ul>
        ) : (
          <p>No city data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
