import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend-production.up.railway.app/api';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    trade: 'ELECTRICIAN',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    hours: '',
    rateMin: '',
    rateMax: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const trades = ['ELECTRICIAN', 'PLUMBER', 'HVAC', 'CARPENTER', 'MASON', 'PAINTER', 'ROOFER', 'OTHER'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Job posted successfully!');
        setTimeout(() => {
          navigate('/my-jobs');
        }, 2000);
      } else {
        setError(data.error || 'Failed to post job');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Post a New Job</h1>
        <p style={styles.subtitle}>Fill out the details below to find qualified contractors</p>

        {message && <div style={styles.successMessage}>{message}</div>}
        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Job Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Commercial Electrical Installation" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Trade *</label>
            <select name="trade" value={formData.trade} onChange={handleChange} required style={styles.select}>
              {trades.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Describe the scope of work, requirements, special skills needed..." style={styles.textarea} />
          </div>

          <div style={styles.formGroup}>
            <label>Location *</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="City, State or full address" style={styles.input} />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Start Date *</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label>End Date *</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required style={styles.input} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label>Estimated Hours *</label>
              <input type="number" name="hours" value={formData.hours} onChange={handleChange} required placeholder="Total hours" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label>Min Rate ($/hr)</label>
              <input type="number" name="rateMin" value={formData.rateMin} onChange={handleChange} placeholder="Minimum" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label>Max Rate ($/hr)</label>
              <input type="number" name="rateMax" value={formData.rateMax} onChange={handleChange} placeholder="Maximum" style={styles.input} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#F9FAFB', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { maxWidth: '800px', width: '100%', background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
  title: { fontSize: '1.8rem', color: '#1F2937', marginBottom: '0.5rem' },
  subtitle: { color: '#6B7280', marginBottom: '2rem' },
  formGroup: { marginBottom: '1.5rem', flex: 1 },
  row: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  input: { width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '1rem' },
  select: { width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '1rem', background: 'white' },
  textarea: { width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' },
  submitBtn: { width: '100%', padding: '0.875rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
  successMessage: { background: '#D1FAE5', color: '#065F46', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' },
  errorMessage: { background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }
};

export default PostJob;
