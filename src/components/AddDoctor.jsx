import React, { useState } from 'react';
import { db, storage } from '../Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../css/AddDoctors.css';

const AddDoctor = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialty: '',
    photo: null
  });

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
      if (form.photo) {
        const storageRef = ref(storage, `doctors/${form.photo.name}`);
        await uploadBytes(storageRef, form.photo);
        photoURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'doctors'), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        specialty: form.specialty,
        photo: photoURL,
        createdAt: Timestamp.now()
      });

      alert('Doctor added successfully!');
      setForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        specialty: '',
        photo: null
      });
    } catch (err) {
      console.error('Error adding doctor:', err);
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="add-doctor">
      <h2>Add Doctor</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <select name="specialty" value={form.specialty} onChange={handleChange}>
        <option value="">Select Specialty</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Dermatology">Dermatology</option>
        <option value="General">General</option>
      </select>
      <input name="photo" type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default AddDoctor;
