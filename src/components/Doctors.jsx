import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../Firebase';
import '../css/Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    specialty: '',
    city: ''
  });

  // Fetch all doctors
  const fetchAllDoctors = async () => {
    const snapshot = await getDocs(collection(db, 'doctors'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  // Fetch specialties
  const fetchSpecialties = async () => {
    const snapshot = await getDocs(collection(db, 'specialties'));
    return snapshot.docs.map(doc => doc.data().name);
  };

  // Fetch city names from 'cities' collection
  const fetchCities = async () => {
    const snapshot = await getDocs(collection(db, 'cities'));
    return snapshot.docs.map(doc => doc.id);
  };

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorList, specialtyList, cityList] = await Promise.all([
          fetchAllDoctors(),
          fetchSpecialties(),
          fetchCities()
        ]);
        setDoctors(doctorList);
        setFilteredDoctors(doctorList);
        setSpecialties(specialtyList);
        setCities(cityList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle filter change
  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    if (!newFilters.city && !newFilters.specialty) {
      setFilteredDoctors(doctors);
    } else if (newFilters.city && !newFilters.specialty) {
      const cityDoc = await getDoc(doc(db, 'cities', newFilters.city.toLowerCase()));
      if (cityDoc.exists()) {
        const doctorIds = cityDoc.data().doctors?.map(doc => doc.id) || [];
        setFilteredDoctors(doctors.filter(doc => doctorIds.includes(doc.id)));
      }
    } else if (!newFilters.city && newFilters.specialty) {
      setFilteredDoctors(doctors.filter(doc => doc.specialty === newFilters.specialty));
    } else {
      const cityDoc = await getDoc(doc(db, 'cities', newFilters.city.toLowerCase()));
      const doctorIds = cityDoc.exists() ? cityDoc.data().doctors?.map(doc => doc.id) : [];
      setFilteredDoctors(
        doctors.filter(doc =>
          doc.specialty === newFilters.specialty && doctorIds.includes(doc.id)
        )
      );
    }
  };

  // Handle delete
  const handleDelete = async (doctorId) => {
    const confirm = window.confirm('Are you sure you want to delete this doctor?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'doctors', doctorId));
      const updatedDoctors = doctors.filter(doc => doc.id !== doctorId);
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="doctors">
      <h2>Doctors</h2>
      <button className="add-btn">Add Doctor</button>

      <div className="filters">
        <select name="specialty" value={filters.specialty} onChange={handleFilterChange}>
          <option value="">Filter by Specialty</option>
          {specialties.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>

        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">Filter by City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Specialty</th><th>City</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name || '—'}</td>
              <td>{doc.specialty || '—'}</td>
              <td>{doc.city || '—'}</td>
              <td>Active</td>
              <td>
                <button onClick={() => handleDelete(doc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
