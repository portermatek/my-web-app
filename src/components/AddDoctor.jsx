import React, { useEffect, useState } from 'react';
import { db, storage } from '../Firebase';
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../css/AddDoctors.css';

const AddDoctor = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialty: '',
    city: '',
    photo: null
  });

  const [specialties, setSpecialties] = useState([]);

  // Fetch specialties from Firebase
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'specialties'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSpecialties(data);
      } catch (err) {
        console.error('Error fetching specialties:', err);
      }
    };

    fetchSpecialties();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      let photoURL = '';

      // Upload photo to Firebase Storage
      if (form.photo) {
        const photoRef = ref(storage, `doctors/${Date.now()}_${form.photo.name}`);
        await uploadBytes(photoRef, form.photo);
        photoURL = await getDownloadURL(photoRef);
      }

      // Add doctor info to Firestore
      const docRef = await addDoc(collection(db, 'doctors'), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        specialty: form.specialty,
        city: form.city,
        photo: photoURL,
        createdAt: Timestamp.now()
      });

      // Add doctor to city listing
      const cityRef = doc(db, 'cities', form.city.toLowerCase());
      await setDoc(
        cityRef,
        {
          doctors: arrayUnion({
            id: docRef.id,
            name: form.name,
            specialty: form.specialty
          })
        },
        { merge: true }
      );

      alert('Doctor added successfully!');

      setForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        specialty: '',
        city: '',
        photo: null
      });
    } catch (err) {
      console.error('Error adding doctor:', err);
      alert('Failed to add doctor. Check console for details.');
    }
  };

  return (
    <div className="add-doctor">
      <h2>Add Doctor</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />

      <select name="specialty" value={form.specialty} onChange={handleChange}>
        <option value="">Select Specialty</option>
        {specialties.map((spec) => (
          <option key={spec.id} value={spec.name}>
            {spec.name}
          </option>
        ))}
      </select>

      <input name="photo" type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default AddDoctor;
