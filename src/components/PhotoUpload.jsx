import React, { useEffect, useState, useRef } from 'react';
import { db, storage } from '../Firebase';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../css/PhotoUpload.css';

const PhotoUpload = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef();

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'doctors'));
        const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(doctorsList);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  // Load selected doctor's current photo
  useEffect(() => {
    const fetchDoctorPhoto = async () => {
      if (!selectedDoctorId) {
        setCurrentPhoto(null);
        return;
      }
      const doctorRef = doc(db, 'doctors', selectedDoctorId);
      const snapshot = await getDoc(doctorRef);
      if (snapshot.exists()) {
        setCurrentPhoto(snapshot.data().photo || null);
      }
    };
    fetchDoctorPhoto();
  }, [selectedDoctorId]);

  const handleUpload = async () => {
    if (!selectedDoctorId || !photo) {
      alert('Please select a doctor and a photo to upload.');
      return;
    }

    try {
      // Create a reference to the storage location
      const photoRef = ref(storage, `doctors/${Date.now()}_${photo.name}`);

      // Upload the file to Firebase Storage
      await uploadBytes(photoRef, photo);

      // Get the download URL for the uploaded photo
      const photoURL = await getDownloadURL(photoRef);

      // Update Firestore with the new photo URL (this stores it as a string)
      const doctorRef = doc(db, 'doctors', selectedDoctorId);
      await updateDoc(doctorRef, { photo: photoURL });

      // Show success message and reset states
      setUploadSuccess(true);
      setPhoto(null);
      setPreview(null);
      setSelectedDoctorId('');
      setCurrentPhoto(photoURL);

      // Clear file input
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Hide success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Error uploading photo:', err);
      alert('Failed to upload photo. Please try again.');
    }
  };

  return (
    <div className="photo-upload">
      <h2>Upload Doctor Photo</h2>

      <select
        value={selectedDoctorId}
        onChange={(e) => setSelectedDoctorId(e.target.value)}
      >
        <option value="">Select Doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      {currentPhoto && (
        <div className="current-photo">
          <p>Current Photo:</p>
          <img src={currentPhoto} alt="Doctor" width="150" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          setPhoto(file);
          setPreview(file ? URL.createObjectURL(file) : null);
        }}
      />

      {preview && (
        <div className="preview">
          <p>Preview:</p>
          <img src={preview} alt="Preview" width="150" />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedDoctorId || !photo}
        style={{ marginTop: '10px' }}
      >
        Upload
      </button>

      {uploadSuccess && <p style={{ color: 'green', marginTop: '10px' }}>Upload successful!</p>}
    </div>
  );
};

export default PhotoUpload;
