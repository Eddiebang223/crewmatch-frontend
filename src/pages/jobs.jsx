import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend-production.up.railway.app/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/jobs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs || []);
      } else {
        setError(data.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading jobs...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Jobs</h1>
      {error && <div style={styles.error}>{error}</div>}
      {jobs.length === 0 ? (
        <div style={styles.empty}>
          <p>No jobs available right now. Check back later!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {jobs.map(job => (
            <div key={job.id} style={styles.card}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
             
