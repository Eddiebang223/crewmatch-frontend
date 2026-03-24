import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend-production.up.railway.app/api';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({ trade: '', location: '', minRate: '', maxRate: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    loadSavedJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters, searchTerm]);

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

  const loadSavedJobs = () => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) setSavedJobs(JSON.parse(saved));
  };

  const saveJob = (jobId) => {
    const newSaved = [...savedJobs, jobId];
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    alert('Job saved!');
  };

  const unsaveJob = (jobId) => {
    const newSaved = savedJobs.filter(id => id !== jobId);
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const isJobSaved = (jobId) => savedJobs.includes(jobId);

  const applyFilters = () => {
    let filtered = [...jobs];
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.trade) filtered = filtered.filter(job => job.trade === filters.trade);
    if (filters.location) filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.minRate) filtered = filtered.filter(job => job.rateMin >= parseFloat(filters.minRate));
    if (filters.maxRate) filtered = filtered.filter(job => job.rateMax <= parseFloat(filters.maxRate));
    setFilteredJobs(filtered);
  };

  const handleBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert('Please enter a valid bid amount');
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ jobId: selectedJob.id, proposedRate: parseFloat(bidAmount), message: bidMessage })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(`✅ Bid submitted successfully for ${selectedJob.title}!`);
        setSelectedJob(null);
        setBidAmount('');
        setBidMessage('');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchJobs();
      } else {
        alert(data.error || 'Failed to submit bid');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const resetFilters = () => {
    setFilters({ trade: '', location: '', minRate: '', maxRate: '' });
    setSearchTerm('');
  };

  const getRateDisplay = (job) => {
    if (job.rateMin && job.rateMax) return `$${job.rateMin} - $${job.rateMax}/hr`;
    if (job.rateMin) return `From $${job.rateMin}/hr`;
    if (job.rateMax) return `Up to $${job.rateMax}/hr`;
    return 'Rate negotiable';
  };

  const getDaysLeft = (endDate) => {
    const diffDays = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Last day!';
    return `${diffDays} days left`;
  };

  const trades = [
    { value: '', label: 'All Trades' },
    { value: 'ELECTRICIAN', label: '⚡ Electrician' },
    { value: 'PLUMBER', label: '💧 Plumber' },
    { value: 'HVAC', label: '❄️ HVAC' },
    { value: 'CARPENTER', label: '🪚 Carpenter' },
    { value: 'MASON', label: '🧱 Mason' },
    { value: 'PAINTER', label: '🎨 Painter' },
    { value: 'ROOFER', label: '🏠 Roofer' },
    { value: 'OTHER', label: '🔧 Other' }
  ];

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Find Jobs</h1>
          <p style={styles.subtitle}>{filteredJobs.length} jobs available</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => setViewMode('grid')} style={{ ...styles.viewToggle, ...(viewMode === 'grid' && styles.viewToggleActive) }}>Grid</button>
          <button onClick={() => setViewMode('list')} style={{ ...styles.viewToggle, ...(viewMode === 'list' && styles.viewToggleActive) }}>List</button>
        </div>
      </div>

      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

      <div style={styles.searchBar}>
        <div style={styles.searchInput}>
          <span>🔍</span>
          <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInputField} />
        </div>
        <button onClick={resetFilters} style={styles.resetBtn}>Reset</button>
      </div>

      <div style={styles.filtersRow}>
        <select value={filters.trade} onChange={(e) => setFilters({ ...filters, trade: e.target.value })} style={styles.filterSelect}>
          {trades.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input type="text" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} style={styles.filterInput} />
        <input type="number" placeholder="Min Rate" value={filters.minRate} onChange={(e) => setFilters({ ...filters, minRate: e.target.value })} style={styles.filterSmall} />
        <input type="number" placeholder="Max Rate" value={filters.maxRate} onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })} style={styles.filterSmall} />
      </div>

      {error && <div style={styles.errorMsg}>{error}</div>}

      {filteredJobs.length === 0 ? (
        <div style={styles.noJobs}>
          <span style={styles.noJobsIcon}>🔍</span>
          <h3>No jobs found</h3>
          <p>Try adjusting your filters or check back later.</p>
          <button onClick={resetFilters} style={styles.resetFiltersBtn}>Clear Filters</button>
        </div>
      ) : (
        <div style={viewMode === 'grid' ? styles.jobsGrid : styles.jobsList}>
          {filteredJobs.map(job => (
            <div key={job.id} style={viewMode === 'grid' ? styles.jobCard : styles.jobListItem}>
              <div style={styles.jobHeader}>
                <span style={styles.jobTrade}>{job.trade}</span>
                <span style={styles.jobStatus}>Open</span>
              </div>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p style={styles.jobDescription}>{job.description}</p>
              <div style={styles.jobDetails}>
                <span>📍 {job.location}</span>
                <span>📅 {new Date(job.startDate).toLocaleDateString()}</span>
                <span>⏰ {job.hours} hrs</span>
                <span>💰 {getRateDisplay(job)}</span>
                <span>⏳ {getDaysLeft(job.endDate)}</span>
              </div>
              <div style={styles.jobActions}>
                <button onClick={() => setSelectedJob(job)} style={styles.bidBtn}>Submit Bid →</button>
                {isJobSaved(job.id) ? (
                  <button onClick={() => unsaveJob(job.id)} style={styles.savedBtn}>★ Saved</button>
                ) : (
                  <button onClick={() => saveJob(job.id)} style={styles.saveBtn}>☆ Save</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div style={styles.modalOverlay} onClick={() => setSelectedJob(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Submit Bid</h2>
              <button style={styles.modalClose} onClick={() => setSelectedJob(null)}>✕</button>
            </div>
            <div style={styles.modalJobInfo}>
              <h3>{selectedJob.title}</h3>
              <p>{selectedJob.description}</p>
              <div style={styles.modalDetails}>
                <span>📍 {selectedJob.location}</span>
                <span>💰 {getRateDisplay(selectedJob)}</span>
                <span>⏰ {selectedJob.hours} hours</span>
              </div>
            </div>
            <div style={styles.modalForm}>
              <label>Your Bid Rate ($/hour) *</label>
              <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder={`Suggested: $${selectedJob.rateMin} - $${selectedJob.rateMax}`} style={styles.modalInput} />
              <label>Message (optional)</label>
              <textarea value={bidMessage} onChange={(e) => setBidMessage(e.target.value)} placeholder="Introduce yourself and why you're the best fit..." rows="3" style={styles.modalTextarea} />
              <div style={styles.modalActions}>
                <button onClick={handleBid} disabled={submitting} style={styles.submitBtn}>{submitting ? 'Submitting...' : 'Submit Bid'}</button>
                <button onClick={() => setSelectedJob(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1400px', margin: '0 auto', padding: '2rem', minHeight: '100vh', background: '#F9FAFB' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' },
  title: { fontSize: '2rem', color: '#1F2937', marginBottom: '0.25rem' },
  subtitle: { color: '#6B7280' },
  headerActions: { display: 'flex', gap: '0.5rem' },
  viewToggle: { padding: '0.5rem 1rem', background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' },
  viewToggleActive: { background: '#0F4C5F', color: 'white', borderColor: '#0F4C5F' },
  searchBar: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
  searchInput: { flex: 1, display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '0.75rem 1rem', gap: '0.5rem' },
  searchInputField: { flex: 1, border: 'none', outline: 'none', fontSize: '1rem' },
  resetBtn: { padding: '0.75rem 1.5rem', background: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  filtersRow: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  filterSelect: { flex: 1, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', background: 'white' },
  filterInput: { flex: 1, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  filterSmall: { width: '120px', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  jobsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' },
  jobsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  jobCard: { background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  jobListItem: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  jobTrade: { background: '#EFF6FF', color: '#0F4C5F', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' },
  jobStatus: { background: '#D1FAE5', color: '#065F46', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' },
  jobTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.75rem' },
  jobDescription: { color: '#6B7280', marginBottom: '1rem', lineHeight: '1.5' },
  jobDetails: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6', fontSize: '0.875rem', color: '#4B5563' },
  jobActions: { display: 'flex', gap: '1rem' },
  bidBtn: { flex: 1, background: '#0F4C5F', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
  saveBtn: { padding: '0.75rem 1rem', background: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  savedBtn: { padding: '0.75rem 1rem', background: '#FEF3C7', color: '#D97706', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  noJobs: { textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px' },
  noJobsIcon: { fontSize: '4rem', display: 'block', marginBottom: '1rem' },
  resetFiltersBtn: { marginTop: '1rem', padding: '0.5rem 1rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  successMessage: { background: '#D1FAE5', color: '#065F46', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center' },
  errorMsg: { background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' },
  spinner: { width: '40px', height: '40px', border: '3px solid #F3F4F6', borderTop: '3px solid #0F4C5F', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '20px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #E5E7EB' },
  modalClose: { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' },
  modalJobInfo: { padding: '1.5rem', borderBottom: '1px solid #E5E7EB' },
  modalDetails: { display: 'flex', gap: '1rem', marginTop: '1rem', color: '#6B7280' },
  modalForm: { padding: '1.5rem' },
  modalInput: { width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '1rem', marginTop: '0.25rem' },
  modalTextarea: { width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '1rem', marginTop: '0.25rem', fontFamily: 'inherit' },
  modalActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
  submitBtn: { flex: 1, background: '#0F4C5F', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
  cancelBtn: { flex: 1, background: '#F3F4F6', color: '#4B5563', padding: '0.75rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default Jobs;
