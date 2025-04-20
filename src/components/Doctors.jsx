import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import '../css/Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'doctors'));
        const doctorList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors">
      <h2>Doctors</h2>
      <button className="add-btn">Add Doctor</button>
      <div className="filters">
        <select><option>Filter by Specialty</option></select>
        <select><option>Filter by City</option></select>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Specialty</th><th>City</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name || '—'}</td>
              <td>{doc.specialty || '—'}</td>
              <td>{doc.address || '—'}</td>
              <td>Active</td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
