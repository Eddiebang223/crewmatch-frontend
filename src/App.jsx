import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend-production.up.railway.app/api';

// ========== COLORS ==========
const colors = {
  primary: '#0F4C5F',
  primaryLight: '#1E6A81',
  secondary: '#E67E22',
  success: '#27AE60',
  danger: '#E74C3C',
  dark: '#2C3E50',
  gray: '#7F8C8D',
  lightGray: '#ECF0F1',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #0F4C5F 0%, #1E6A81 100%)',
};

// ========== COMPONENTS ==========
const Navbar = ({ user, onLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.navContainer}>
      <Link to="/" style={styles.logo}><span>🚀</span><span>CrewMatch</span></Link>
      <div style={styles.navLinks}>
        {user ? (
          <>
            <div style={styles.userMenu}><span style={styles.userName}>{user.name}</span><span style={styles.userRole}>{user.role === 'GC' ? 'GC' : 'Contractor'}</span></div>
            <button onClick={onLogout} style={styles.logoutBtn}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Sign In</Link>
            <Link to="/register" style={styles.registerBtn}>Get Started</Link>
          </>
        )}
      </div>
    </div>
  </nav>
);

const Card = ({ children, title, icon }) => (
  <div style={styles.card}>
    {icon && <div style={styles.cardIcon}>{icon}</div>}
    {title && <h3 style={styles.cardTitle}>{title}</h3>}
    {children}
  </div>
);

// ========== HOME PAGE ==========
const Home = () => (
  <div style={styles.hero}>
    <div style={styles.heroContent}>
      <h1 style={styles.heroTitle}>Find Trusted Tradespeople<br /><span style={styles.heroHighlight}>In Hours, Not Days</span></h1>
      <p style={styles.heroSubtitle}>CrewMatch connects General Contractors with vetted, reliable tradespeople.</p>
      <div style={styles.heroButtons}>
        <Link to="/register" style={styles.primaryBtn}>Get Started →</Link>
        <Link to="/login" style={styles.secondaryBtn}>Sign In</Link>
      </div>
    </div>
  </div>
);

// ========== LOGIN PAGE ==========
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2>Sign In</h2>
        {error && <div style={styles.errorMsg}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <button type="submit" disabled={loading} style={styles.authBtn}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

// ========== REGISTER PAGE ==========
const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CONTRACTOR', companyName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2>Create Account</h2>
        {error && <div style={styles.errorMsg}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
          <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
            <option value="CONTRACTOR">Trade Professional</option>
            <option value="GC">General Contractor</option>
          </select>
          <input type="text" name="companyName" placeholder={formData.role === 'GC' ? "Company Name" : "Business Name"} value={formData.companyName} onChange={handleChange} style={styles.input} />
          <button type="submit" disabled={loading} style={styles.authBtn}>{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
};

// ========== DASHBOARD PAGE ==========
const Dashboard = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div style={styles.dashboard}>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={styles.dashboardContent}>
        <div style={styles.welcomeSection}>
          <h1>Welcome back, {user.name} 👋</h1>
          <p>{user.role === 'GC' ? 'Post jobs and find qualified contractors.' : 'Find jobs and grow your business.'}</p>
        </div>
        <div style={styles.grid}>
          {user.role === 'GC' ? (
            <>
              <Card title="Post a Job" icon="📋"><button onClick={() => window.location.href = '/post-job'} style={styles.cardBtn}>Post Job →</button></Card>
              <Card title="My Jobs" icon="📊"><button onClick={() => window.location.href = '/my-jobs'} style={styles.cardBtn}>View Jobs →</button></Card>
            </>
          ) : (
            <>
              <Card title="Find Work" icon="🔍"><button onClick={() => window.location.href = '/jobs'} style={styles.cardBtn}>Find Jobs →</button></Card>
              <Card title="My Bids" icon="📝"><button onClick={() => window.location.href = '/my-bids'} style={styles.cardBtn}>View Bids →</button></Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== JOBS PAGE ==========
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ trade: '', location: '' });

  useEffect(() => { fetchJobs(); }, []);

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

  const filteredJobs = jobs.filter(job => {
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && !job.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.trade && job.trade !== filters.trade) return false;
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });

  const trades = ['', 'ELECTRICIAN', 'PLUMBER', 'HVAC', 'CARPENTER', 'MASON', 'PAINTER', 'ROOFER', 'OTHER'];

  if (loading) return <div style={styles.loading}>Loading jobs...</div>;

  return (
    <div style={jobStyles.container}>
      <div style={jobStyles.header}>
        <h1>Find Jobs</h1>
        <p>{filteredJobs.length} jobs available</p>
      </div>
      {successMessage && <div style={jobStyles.successMessage}>{successMessage}</div>}
      {error && <div style={jobStyles.error}>{error}</div>}
      <div style={jobStyles.searchBar}>
        <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={jobStyles.searchInput} />
        <select value={filters.trade} onChange={(e) => setFilters({ ...filters, trade: e.target.value })} style={jobStyles.filterSelect}>
          {trades.map(t => <option key={t} value={t}>{t || 'All Trades'}</option>)}
        </select>
        <input type="text" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} style={jobStyles.filterInput} />
        <button onClick={() => { setSearchTerm(''); setFilters({ trade: '', location: '' }); }} style={jobStyles.resetBtn}>Reset</button>
      </div>
      {filteredJobs.length === 0 ? (
        <div style={jobStyles.noJobs}><p>No jobs found.</p></div>
      ) : (
        <div style={jobStyles.grid}>
          {filteredJobs.map(job => (
            <div key={job.id} style={jobStyles.card}>
              <div style={jobStyles.cardHeader}><span>{job.trade}</span><span>Open</span></div>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <div style={jobStyles.details}><span>📍 {job.location}</span><span>⏰ {job.hours} hrs</span><span>💰 ${job.rateMin}-${job.rateMax}/hr</span></div>
              <button onClick={() => setSelectedJob(job)} style={jobStyles.bidBtn}>Submit Bid →</button>
            </div>
          ))}
        </div>
      )}
      {selectedJob && (
        <div style={jobStyles.modalOverlay} onClick={() => setSelectedJob(null)}>
          <div style={jobStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Submit Bid</h2>
            <h3>{selectedJob.title}</h3>
            <input type="number" placeholder="Your Bid ($/hour)" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} style={jobStyles.modalInput} />
            <textarea placeholder="Message (optional)" value={bidMessage} onChange={(e) => setBidMessage(e.target.value)} rows="3" style={jobStyles.modalTextarea} />
            <button onClick={handleBid} disabled={submitting} style={jobStyles.submitBtn}>{submitting ? 'Submitting...' : 'Submit Bid'}</button>
            <button onClick={() => setSelectedJob(null)} style={jobStyles.cancelBtn}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ========== POST JOB PAGE ==========
const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', trade: 'ELECTRICIAN', description: '', location: '',
    startDate: '', endDate: '', hours: '', rateMin: '', rateMax: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const trades = ['ELECTRICIAN', 'PLUMBER', 'HVAC', 'CARPENTER', 'MASON', 'PAINTER', 'ROOFER', 'OTHER'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Job posted successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(data.error || 'Failed to post job');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={postStyles.container}>
      <div style={postStyles.card}>
        <h1>Post a New Job</h1>
        {message && <div style={postStyles.success}>{message}</div>}
        {error && <div style={postStyles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required style={postStyles.input} />
          <select name="trade" value={formData.trade} onChange={handleChange} style={postStyles.select}>{trades.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="4" style={postStyles.textarea} />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={postStyles.input} />
          <div style={postStyles.row}><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={postStyles.input} /><input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required style={postStyles.input} /></div>
          <div style={postStyles.row}><input type="number" name="hours" placeholder="Hours" value={formData.hours} onChange={handleChange} required style={postStyles.input} /><input type="number" name="rateMin" placeholder="Min Rate" value={formData.rateMin} onChange={handleChange} style={postStyles.input} /><input type="number" name="rateMax" placeholder="Max Rate" value={formData.rateMax} onChange={handleChange} style={postStyles.input} /></div>
          <button type="submit" disabled={loading} style={postStyles.submitBtn}>{loading ? 'Posting...' : 'Post Job'}</button>
        </form>
      </div>
    </div>
  );
};

// ========== HOW IT WORKS PAGE ==========
const HowItWorks = () => <div style={styles.pagePlaceholder}>How It Works - Coming Soon</div>;
const MyBids = () => <div style={styles.pagePlaceholder}>My Bids - Coming Soon</div>;
const MyJobs = () => <div style={styles.pagePlaceholder}>My Jobs - Coming Soon</div>;

// ========== STYLES ==========
const styles = {
  navbar: { background: colors.white, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '1rem 2rem' },
  navContainer: { maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: colors.primary, textDecoration: 'none', display: 'flex', gap: '0.5rem' },
  navLinks: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  navLink: { color: colors.dark, textDecoration: 'none' },
  registerBtn: { background: colors.primary, color: colors.white, padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none' },
  logoutBtn: { background: 'transparent', border: `1px solid ${colors.lightGray}`, padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },
  userMenu: { textAlign: 'right' },
  userName: { display: 'block', fontWeight: '600' },
  userRole: { fontSize: '0.75rem', color: colors.gray },
  hero: { background: colors.gradient, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: colors.white },
  heroContent: { maxWidth: '800px', padding: '2rem' },
  heroTitle: { fontSize: '3rem', marginBottom: '1rem' },
  heroHighlight: { color: colors.secondary },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem' },
  heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  primaryBtn: { background: colors.white, color: colors.primary, padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' },
  secondaryBtn: { background: 'transparent', color: colors.white, padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', border: `2px solid ${colors.white}` },
  authContainer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.lightGray },
  authCard: { background: colors.white, padding: '2rem', borderRadius: '16px', width: '400px', maxWidth: '90%' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: `1px solid ${colors.lightGray}`, borderRadius: '8px' },
  select: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: `1px solid ${colors.lightGray}`, borderRadius: '8px', background: colors.white },
  authBtn: { width: '100%', padding: '0.75rem', background: colors.primary, color: colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  errorMsg: { background: '#FEE2E2', color: colors.danger, padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
  dashboard: { minHeight: '100vh', background: colors.lightGray },
  dashboardContent: { maxWidth: '1280px', margin: '0 auto', padding: '2rem' },
  welcomeSection: { background: colors.white, borderRadius: '16px', padding: '2rem', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { background: colors.white, borderRadius: '16px', padding: '1.5rem', textAlign: 'center' },
  cardIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.25rem', marginBottom: '0.5rem' },
  cardBtn: { marginTop: '1rem', padding: '0.5rem 1rem', background: colors.primary, color: colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer' },
  pagePlaceholder: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: colors.gray },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
};

const jobStyles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '100vh', background: '#F9FAFB' },
  header: { marginBottom: '2rem' },
  searchBar: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  searchInput: { flex: 2, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  filterSelect: { flex: 1, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  filterInput: { flex: 1, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  resetBtn: { padding: '0.75rem 1.5rem', background: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  details: { display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' },
  bidBtn: { width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  successMessage: { background: '#D1FAE5', color: '#065F46', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' },
  error: { background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' },
  noJobs: { textAlign: 'center', padding: '3rem' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%' },
  modalInput: { width: '100%', padding: '0.75rem', margin: '1rem 0', border: '1px solid #E5E7EB', borderRadius: '8px' },
  modalTextarea: { width: '100%', padding: '0.75rem', margin: '1rem 0', border: '1px solid #E5E7EB', borderRadius: '8px', fontFamily: 'inherit' },
  submitBtn: { width: '100%', padding: '0.75rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem' },
  cancelBtn: { width: '100%', padding: '0.75rem', background: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

const postStyles = {
  container: { minHeight: '100vh', background: '#F9FAFB', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { maxWidth: '800px', width: '100%', background: 'white', borderRadius: '16px', padding: '2rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' },
  select: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', background: 'white' },
  textarea: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontFamily: 'inherit' },
  row: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  submitBtn: { width: '100%', padding: '0.75rem', background: '#0F4C5F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  success: { background: '#D1FAE5', color: '#065F46', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
  error: { background: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }
};

// ========== MAIN APP ==========
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    window.location.href = '/dashboard';
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <Router>
      {!user && <Navbar user={null} onLogout={() => {}} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/post-job" element={user && user.role === 'GC' ? <PostJob /> : <Navigate to="/dashboard" />} />
        <Route path="/jobs" element={user && user.role === 'CONTRACTOR' ? <Jobs /> : <Navigate to="/dashboard" />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
};

export default App;
