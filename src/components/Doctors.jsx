import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase'; // Adjust path based on your Firebase config
import '../css/Doctors.css'; // Your custom styling

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'doctors'));
        const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList); // Initially show all doctors
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = doctors.filter((doctor) =>
      (doctor.name && doctor.name.toLowerCase().includes(lowerSearch)) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(lowerSearch)) ||
      (doctor.city && doctor.city.toLowerCase().includes(lowerSearch))
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="doctors">
      <h2>Doctors</h2>

      {/* Search Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, specialty, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Doctors List */}
      <div className="doctor-list">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    {doctor.photo ? (
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty || '-'}</td>
                  <td>{doctor.city || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Doctors;
