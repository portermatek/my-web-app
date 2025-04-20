// src/components/Specialties.js
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import '../css/Specialties.css';

const Specialties = () => {
  const [specialtyName, setSpecialtyName] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Realtime listener for specialties collection
    const q = query(collection(db, 'specialties'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSpecialties(list);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSpecialty = async () => {
    if (specialtyName.trim() === '') return;

    try {
      await addDoc(collection(db, 'specialties'), {
        name: specialtyName.trim()
      });
      setSpecialtyName('');
    } catch (err) {
      console.error('Error adding specialty:', err);
      alert('Failed to add specialty.');
    }
  };

  return (
    <div className="specialties">
      <h2>Specialties</h2>
      <p>Add or manage specialties here.</p>
      <button onClick={() => setShowInput(!showInput)}>
        {showInput ? 'Cancel' : 'Add Specialty'}
      </button>

      {showInput && (
        <div className="add-specialty-form">
          <input
            type="text"
            value={specialtyName}
            placeholder="Enter specialty name"
            onChange={(e) => setSpecialtyName(e.target.value)}
          />
          <button onClick={handleAddSpecialty}>Save</button>
        </div>
      )}

      <ul className="specialty-list">
        {specialties.map((spec) => (
          <li key={spec.id}>{spec.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Specialties;
