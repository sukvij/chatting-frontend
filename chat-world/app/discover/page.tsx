'use client';

import React, { useEffect, useState } from 'react';
import styles from './discover.module.css';

interface User {
  id: number;
  name: string;
  country: string;
  photo: string;
  lastOnline: string;
}

const DiscoverPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Filters
  const [search, setSearch] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [status, setStatus] = useState<string>(''); // Online / Offline

  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch('https://randomuser.me/api/?results=20');
    const data = await res.json();

    const formattedUsers: User[] = data.results.map((item: any, index: number) => ({
      id: index,
      name: `${item.name.first} ${item.name.last}`,
      country: item.location.country,
      photo: item.picture.medium,
      lastOnline: Math.random() > 0.5 ? 'Online' : 'Offline', // mock
    }));

    setUsers(formattedUsers);
    setFilteredUsers(formattedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply Filters
  useEffect(() => {
    let temp = [...users];

    // Search filter
    if (search) {
      temp = temp.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Country filter
    if (country) {
      temp = temp.filter(user => user.country === country);
    }

    // Status filter
    if (status) {
      temp = temp.filter(user => user.lastOnline === status);
    }

    setFilteredUsers(temp);
  }, [search, country, status, users]);

  // Unique countries for dropdown
  const countries = [...new Set(users.map(u => u.country))];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌍 Discover People</h1>

      {/* FILTER SECTION */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={styles.select}
        >
          <option value="">All Countries</option>
          {countries.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="">All Status</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* USERS */}
      <div className={styles.grid}>
        {filteredUsers.map((user) => (
          <div key={user.id} className={styles.card}>
            <img src={user.photo} className={styles.image} />

            <h2 className={styles.name}>{user.name}</h2>

            <p className={styles.country}>📍 {user.country}</p>

            <p className={styles.status}>
              {user.lastOnline === 'Online' ? '🟢' : '🔴'} {user.lastOnline}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;