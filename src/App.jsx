import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend.up.railway.app/api';

// ========== STYLES ==========
const colors = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  secondary: '#8B5CF6',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  dark: '#1F2937',
  light: '#F3F4F6',
  white: '#FFFFFF',
};

// ========== COMPONENTS ==========
const Navbar = ({ user, onLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.navContainer}>
      <Link to="/" style={styles.logo}>🚀 CrewMatch</Link>
      <div style={styles.navLinks}>
        {user ? (
          <>
            <span style={styles.welcome}>Welcome, {user.name}</span>
            <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Sign Up</Link>
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

const Button = ({ children, onClick, variant = 'primary', disabled, fullWidth }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      ...styles.button,
      ...styles.buttonVariants[variant],
      ...(fullWidth && styles.fullWidth),
      ...(disabled && styles.buttonDisabled)
    }}
  >
    {children}
  </button>
);

// ========== PAGES ==========
const Home = () => (
  <div style={styles.hero}>
    <div style={styles.heroContent}>
      <h1 style={styles.heroTitle}>Connect with Top Construction Professionals</h1>
      <p style={styles.heroSubtitle}>CrewMatch connects General Contractors with skilled tradespeople. Post jobs, get bids, and hire in hours, not days.</p>
      <div style={styles.heroButtons}>
        <Link to="/register" style={styles.primaryBtn}>Get Started →</Link>
        <Link to="/login" style={styles.secondaryBtn}>Sign In</Link>
      </div>
      <div style={styles.features}>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>📋</span>
          <span>Post Jobs</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>🤝</span>
          <span>Get Bids</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>💳</span>
          <span>Pay Securely</span>
        </div>
      </div>
    </div>
  </div>
);

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
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <Card title="Welcome Back" icon="🔐">
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorMsg}>{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p style={styles.authFooter}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </Card>
    </div>
  );
};

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

  return (
    <div style={styles.authContainer}>
      <Card title="Create Account" icon="✨">
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorMsg}>{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            style={styles.input}
          />
          <select
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={styles.select}
          >
            <option value="CONTRACTOR">I am a Contractor</option>
            <option value="GC">I am a General Contractor</option>
          </select>
          <input
            type="text"
            name="companyName"
            placeholder={formData.role === 'GC' ? "Company Name" : "Business Name"}
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            style={styles.input}
          />
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        <p style={styles.authFooter}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};

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
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>{user.role === 'GC' ? 'Post jobs and find qualified contractors instantly.' : 'Find jobs and grow your contracting business.'}</p>
        </div>
        <div style={styles.grid}>
          {user.role === 'GC' ? (
            <>
              <Card title="Post a Job" icon="📋">
                <p>Create a new job posting and get bids from qualified contractors.</p>
                <Button onClick={() => window.location.href = '/post-job'}>Post Job →</Button>
              </Card>
              <Card title="My Jobs" icon="📊">
                <p>View all your active and completed jobs.</p>
                <Button onClick={() => window.location.href = '/my-jobs'} variant="secondary">View Jobs →</Button>
              </Card>
            </>
          ) : (
            <>
              <Card title="Find Work" icon="🔍">
                <p>Browse available jobs in your area and submit bids.</p>
                <Button onClick={() => window.location.href = '/jobs'}>Find Jobs →</Button>
              </Card>
              <Card title="My Bids" icon="📝">
                <p>Track your submitted bids and see their status.</p>
                <Button onClick={() => window.location.href = '/my-bids'} variant="secondary">View Bids →</Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const PostJob = () => <div style={styles.pagePlaceholder}>Post Job Page - Coming Soon</div>;
const Jobs = () => <div style={styles.pagePlaceholder}>Jobs Page - Coming Soon</div>;
const MyBids = () => <div style={styles.pagePlaceholder}>My Bids Page - Coming Soon</div>;
const MyJobs = () => <div style={styles.pagePlaceholder}>My Jobs Page - Coming Soon</div>;

// ========== MAIN APP ==========
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
        <Route path="/post-job" element={user ? <PostJob /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/my-bids" element={user ? <MyBids /> : <Navigate to="/login" />} />
        <Route path="/my-jobs" element={user ? <MyJobs /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// ========== STYLES ==========
const styles = {
  navbar: { background: colors.white, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 },
  navContainer: { maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: colors.primary, textDecoration: 'none' },
  navLinks: { display: 'flex', gap: '1rem', alignItems: 'center' },
  navLink: { color: colors.dark, textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s' },
  registerBtn: { background: colors.primary, color: colors.white, padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' },
  welcome: { color: colors.dark, marginRight: '1rem' },
  logoutBtn: { background: colors.danger, color: colors.white, border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },
  hero: { background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' },
  heroContent: { maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem', color: colors.white },
  heroTitle: { fontSize: '3rem', marginBottom: '1rem' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 },
  heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' },
  primaryBtn: { background: colors.white, color: colors.primary, padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', transition: 'all 0.2s' },
  secondaryBtn: { background: 'transparent', color: colors.white, padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', border: `2px solid ${colors.white}`, fontWeight: 'bold' },
  features: { display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' },
  feature: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' },
  featureIcon: { fontSize: '2rem' },
  authContainer: { minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.light, padding: '2rem' },
  card: { background: colors.white, borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%', textAlign: 'center' },
  cardIcon: { fontSize: '3rem', marginBottom: '1rem' },
  cardTitle: { marginBottom: '1rem', color: colors.dark },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: `1px solid ${colors.light}`, borderRadius: '8px', fontSize: '1rem' },
  select: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: `1px solid ${colors.light}`, borderRadius: '8px', fontSize: '1rem', background: colors.white },
  button: { padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
  buttonVariants: { primary: { background: colors.primary, color: colors.white }, secondary: { background: colors.light, color: colors.dark } },
  fullWidth: { width: '100%' },
  buttonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  errorMsg: { background: '#FEE2E2', color: colors.danger, padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' },
  authFooter: { marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' },
  dashboard: { minHeight: '100vh', background: colors.light },
  dashboardContent: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  welcomeSection: { background: colors.white, borderRadius: '16px', padding: '2rem', marginBottom: '2rem', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' },
  pagePlaceholder: { minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: colors.dark, background: colors.light },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.2rem', color: colors.dark }
};

export default App;
