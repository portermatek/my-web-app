import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../Firebase';
import '../css/Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editFields, setEditFields] = useState({ name: '', specialty: '', city: '' });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'doctors'));
      const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorsList);
      setFilteredDoctors(doctorsList);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = doctors.filter((doctor) =>
      (doctor.name && doctor.name.toLowerCase().includes(lowerSearch)) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(lowerSearch)) ||
      (doctor.city && doctor.city.toLowerCase().includes(lowerSearch))
    );
    setFilteredDoctors(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'doctors', id));
      fetchDoctors();
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };

  const toggleSuspend = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'doctors', id), {
        suspended: !currentStatus
      });
      fetchDoctors();
    } catch (err) {
      console.error('Error updating suspension:', err);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setEditFields({ name: doctor.name, specialty: doctor.specialty, city: doctor.city });
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, 'doctors', editingDoctor.id), editFields);
      setEditingDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error('Error saving doctor changes:', err);
    }
  };

  return (
    <div className="doctors">
      <h2>Doctors</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, specialty, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

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
                <th>Status</th>
                <th>Actions</th>
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
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty || '-'}</td>
                  <td>{doctor.city || '-'}</td>
                  <td>{doctor.suspended ? 'Suspended' : 'Active'}</td>
                  <td>
                    <button onClick={() => handleEdit(doctor)}>Edit</button>
                    <button onClick={() => toggleSuspend(doctor.id, doctor.suspended)}>
                      {doctor.suspended ? 'Unsuspend' : 'Suspend'}
                    </button>
                    <button onClick={() => handleDelete(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingDoctor && (
        <div className="edit-modal">
          <h3>Edit Doctor</h3>
          <input
            type="text"
            value={editFields.name}
            onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={editFields.specialty}
            onChange={(e) => setEditFields({ ...editFields, specialty: e.target.value })}
            placeholder="Specialty"
          />
          <input
            type="text"
            value={editFields.city}
            onChange={(e) => setEditFields({ ...editFields, city: e.target.value })}
            placeholder="City"
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingDoctor(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Doctors;
