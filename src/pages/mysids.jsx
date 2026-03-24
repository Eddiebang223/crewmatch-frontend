import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend-production.up.railway.app/api';

const MyBids = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/my-bids`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setBids(data.bids || []);
      } else {
        setError(data.error || 'Failed to fetch bids');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: { background: '#FEF3C7', color: '#D97706', text: 'Pending' },
      ACCEPTED: { background: '#D1FAE5', color: '#065F46', text: 'Accepted' },
      REJECTED: { background: '#FEE2E2', color: '#991B1B', text: 'Rejected' }
    };
    const s = styles[status] || styles.PENDING;
    return <span style={{ ...badgeStyles, background: s.background, color: s.color }}>{s.text}</span>;
  };

  if (loading) {
    return <div style={styles.loading}>Loading your bids...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Bids</h1>
        <button onClick={() => navigate('/jobs')} style={styles.browseBtn}>Browse More Jobs</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {bids.length === 0 ? (
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>📝</span>
          <h3>No bids submitted yet</h3>
          <p>Start browsing jobs and submit your first bid!</p>
          <button onClick={() => navigate('/jobs')} style={styles.emptyBtn}>Find Jobs</button>
        </div>
      ) : (
        <div style={styles.bidsList}>
          {bids.map(bid => (
            <div key={bid.id} style={styles.bidCard}>
              <div style={styles.bidHeader}>
                <h3 style={styles.jobTitle}>Job #{bid.jobId}</h3>
                {getStatusBadge(bid.status)}
              </div>
              <div style={styles.bidDetails}>
                <div style={styles.bidAmount}>
                  <span>💰 Your Bid:</span>
                  <strong>${bid.proposedRate}/hour</strong>
                </div>
                {bid.message && (
                  <div style={styles.bidMessage}>
                    <span>📝 Message:</span>
                    <p>{bid.message}</p>
                  </div>
                )}
                <div style={styles.bidDate}>
                  Submitted: {new Date(bid.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const badgeStyles = {
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: '600'
};

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '2rem', minHeight: '100vh', background: '#F9FAFB' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  title: { fontSize: '2rem', color: '#1F2937' },
  browseBtn: { padding: '0.75rem 1.5rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  error: { background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#6B7280' },
  empty: { textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px' },
  emptyIcon: { fontSize: '4rem', display: 'block', marginBottom: '1rem' },
  emptyBtn: { marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  bidsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  bidCard: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  bidHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  jobTitle: { margin: 0, fontSize: '1.2rem', color: '#1F2937' },
  bidDetails: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  bidAmount: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  bidMessage: { background: '#F3F4F6', padding: '0.75rem', borderRadius: '8px' },
  bidDate: { fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }
};

export default MyBids;
