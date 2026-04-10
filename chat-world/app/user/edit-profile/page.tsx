"use client";

import { useState } from "react";
import styles from "./edit.profile.module.css";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    full_name: "",
    gender: "male",
    birth_date: "",
    country: "",
    city: "",
    bio: "",
    photo_url: "",
    interests: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      interests: form.interests.split(",").map((i) => i.trim()),
    };

    console.log("Payload:", payload);

    // TODO: call your API
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>

      {/* Photo */}
      <label>Photo URL</label>
      <input
        type="text"
        name="photo_url"
        value={form.photo_url}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter image URL"
      />

      {form.photo_url && (
        <img src={form.photo_url} className={styles.image} />
      )}

      {/* Full Name */}
      <label>Full Name</label>
      <input
        type="text"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter full name"
      />

      {/* Gender Dropdown */}
      <label>Gender</label>
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
      </select>

      {/* Birth Date */}
      <label>Birth Date</label>
      <input
        type="date"
        name="birth_date"
        value={form.birth_date}
        onChange={handleChange}
        className={styles.input}
      />

      {/* Country */}
      <label>Country</label>
      <input
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter country"
      />

      {/* City */}
      <label>City</label>
      <input
        type="text"
        name="city"
        value={form.city}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter city"
      />

      {/* Bio */}
      <label>Bio</label>
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        className={styles.textarea}
        placeholder="Write about yourself"
      />

      {/* Interests */}
      <label>Interests (comma separated)</label>
      <input
        type="text"
        name="interests"
        value={form.interests}
        onChange={handleChange}
        className={styles.input}
        placeholder="coding, music, travel"
      />

      {/* Submit */}
      <button onClick={handleSubmit} className={styles.button}>
        Update Profile
      </button>
    </div>
  );
}