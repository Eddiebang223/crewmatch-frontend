import PostJob from './pages/PostJob';
import MyBids from './pages/MyBids';
import MyJobs from './pages/MyJobs';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Jobs from './pages/Jobs';
<Routes>
  <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
  <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
  <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
  <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
  <Route path="/post-job" element={user && user.role === 'GC' ? <PostJob /> : <Navigate to="/dashboard" />} />
  <Route path="/jobs" element={user && user.role === 'CONTRACTOR' ? <Jobs /> : <Navigate to="/dashboard" />} />  {/* ← ADD THIS ROUTE */}
  <Route path="/my-bids" element={user && user.role === 'CONTRACTOR' ? <MyBids /> : <Navigate to="/dashboard" />} />
  <Route path="/my-jobs" element={user && user.role === 'GC' ? <MyJobs /> : <Navigate to="/dashboard" />} />
  <Route path="/how-it-works" element={<HowItWorks />} />
</Routes>

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'https://crewmatch-backend.up.railway.app/api';

// ========== MODERN COLOR PALETTE ==========
const colors = {
  primary: '#0F4C5F',        // Trustworthy teal
  primaryLight: '#1E6A81',   // Lighter teal
  primaryDark: '#0A3A48',    // Darker teal
  secondary: '#E67E22',      // Warm orange accent
  secondaryLight: '#F39C12',
  success: '#27AE60',
  danger: '#E74C3C',
  warning: '#F39C12',
  dark: '#2C3E50',
  gray: '#7F8C8D',
  lightGray: '#ECF0F1',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #0F4C5F 0%, #1E6A81 100%)',
  gradientAccent: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
};

// ========== MODERN COMPONENTS ==========
const Navbar = ({ user, onLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.navContainer}>
      <Link to="/" style={styles.logo}>
        <span style={styles.logoIcon}>🚀</span>
        <span>CrewMatch</span>
      </Link>
      <div style={styles.navLinks}>
        {user ? (
          <>
            <div style={styles.userMenu}>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.userRole}>{user.role === 'GC' ? 'General Contractor' : 'Trade Professional'}</span>
            </div>
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

const TrustBadge = () => (
  <div style={styles.trustBar}>
    <div style={styles.trustItem}>
      <span style={styles.trustIcon}>✓</span>
      <span>10,000+ Jobs Completed</span>
    </div>
    <div style={styles.trustItem}>
      <span style={styles.trustIcon}>⭐</span>
      <span>4.9/5 Rating</span>
    </div>
    <div style={styles.trustItem}>
      <span style={styles.trustIcon}>🔒</span>
      <span>Secure Payments</span>
    </div>
    <div style={styles.trustItem}>
      <span style={styles.trustIcon}>⚡</span>
      <span>24hr Response Time</span>
    </div>
  </div>
);

const Card = ({ children, title, icon, variant = 'default' }) => (
  <div style={{ ...styles.card, ...styles.cardVariants[variant] }}>
    {icon && <div style={styles.cardIcon}>{icon}</div>}
    {title && <h3 style={styles.cardTitle}>{title}</h3>}
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled, fullWidth, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      ...styles.button,
      ...styles.buttonSizes[size],
      ...styles.buttonVariants[variant],
      ...(fullWidth && styles.fullWidth),
      ...(disabled && styles.buttonDisabled)
    }}
  >
    {icon && <span style={styles.buttonIcon}>{icon}</span>}
    {children}
  </button>
);

const Stats = ({ value, label, icon }) => (
  <div style={styles.statCard}>
    <span style={styles.statIcon}>{icon}</span>
    <div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  </div>
);

// ========== PAGES ==========
const Home = () => (
  <div style={styles.hero}>
    <div style={styles.heroOverlay}>
      <div style={styles.heroContent}>
        <div style={styles.badge}>🚀 Trusted by 500+ Companies</div>
        <h1 style={styles.heroTitle}>
          Find Trusted Tradespeople<br />
          <span style={styles.heroHighlight}>In Hours, Not Days</span>
        </h1>
        <p style={styles.heroSubtitle}>
          CrewMatch connects General Contractors with vetted, reliable tradespeople. 
          Post jobs, compare bids, and hire with confidence.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/register" style={styles.primaryBtn}>
            Get Started Free →
          </Link>
          <Link to="/how-it-works" style={styles.secondaryBtn}>
            How It Works
          </Link>
        </div>
        <TrustBadge />
      </div>
    </div>
    
    {/* Features Section */}
    <div style={styles.section}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Why Choose CrewMatch</span>
          <h2 style={styles.sectionTitle}>Built for Construction Professionals</h2>
          <p style={styles.sectionSubtitle}>Everything you need to find, hire, and pay skilled tradespeople</p>
        </div>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <h3>Smart Matching</h3>
            <p>AI-powered matching connects you with qualified tradespeople based on skills, location, and availability.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💳</div>
            <h3>Secure Payments</h3>
            <p>Escrow protection ensures contractors get paid and GCs get quality work. Every transaction is insured.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⭐</div>
            <h3>Verified Reviews</h3>
            <p>Real reviews from verified projects help you make informed hiring decisions with confidence.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📱</div>
            <h3>Mobile Ready</h3>
            <p>Manage jobs and bids from anywhere with our responsive design and mobile-friendly interface.</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Stats Section */}
    <div style={styles.statsSection}>
      <div style={styles.container}>
        <div style={styles.statsGrid}>
          <Stats value="10,000+" label="Jobs Completed" icon="✅" />
          <Stats value="500+" label="Trusted Companies" icon="🏢" />
          <Stats value="48hrs" label="Avg. Time to Hire" icon="⚡" />
          <Stats value="4.9/5" label="Customer Rating" icon="⭐" />
        </div>
      </div>
    </div>
    
    {/* Testimonials */}
    <div style={styles.section}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Testimonials</span>
          <h2 style={styles.sectionTitle}>Trusted by Industry Leaders</h2>
        </div>
        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <p>"CrewMatch cut our hiring time from 3 days to 3 hours. The quality of tradespeople is outstanding."</p>
            <div style={styles.testimonialAuthor}>
              <strong>Mike Johnson</strong>
              <span>Project Manager, Johnson Construction</span>
            </div>
          </div>
          <div style={styles.testimonialCard}>
            <p>"I've found consistent work through CrewMatch. The platform is easy to use and payments are always on time."</p>
            <div style={styles.testimonialAuthor}>
              <strong>Sarah Martinez</strong>
              <span>Master Electrician</span>
            </div>
          </div>
          <div style={styles.testimonialCard}>
            <p>"The best platform for construction professionals. Professional, reliable, and trustworthy."</p>
            <div style={styles.testimonialAuthor}>
              <strong>David Chen</strong>
              <span>GC, Chen Builders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* CTA Section */}
    <div style={styles.ctaSection}>
      <div style={styles.container}>
        <div style={styles.ctaContent}>
          <h2>Ready to transform your hiring process?</h2>
          <p>Join thousands of professionals who trust CrewMatch for their construction needs.</p>
          <Link to="/register" style={styles.ctaBtn}>Get Started Today →</Link>
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
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authSidebar}>
        <h2>Welcome Back</h2>
        <p>Access your dashboard, manage jobs, and connect with top professionals.</p>
        <div style={styles.authFeatures}>
          <div>✓ Manage your jobs</div>
          <div>✓ Track bids and proposals</div>
          <div>✓ Secure payment processing</div>
          <div>✓ 24/7 support</div>
        </div>
      </div>
      <Card title="Sign In" variant="auth">
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorMsg}>{error}</div>}
          <div style={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <Button type="submit" disabled={loading} fullWidth size="large">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <p style={styles.authFooter}>
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'CONTRACTOR', 
    companyName: '' 
  });
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
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authSidebar}>
        <h2>Join CrewMatch</h2>
        <p>Start connecting with top construction professionals today.</p>
        <div style={styles.authFeatures}>
          <div>✓ Free to join</div>
          <div>✓ No upfront fees</div>
          <div>✓ Access to vetted professionals</div>
          <div>✓ Secure payment protection</div>
        </div>
      </div>
      <Card title="Create Account" variant="auth">
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorMsg}>{error}</div>}
          <div style={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>I am a...</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={styles.select}
            >
              <option value="CONTRACTOR">Trade Professional (Electrician, Plumber, etc.)</option>
              <option value="GC">General Contractor</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label>{formData.role === 'GC' ? 'Company Name' : 'Business Name'}</label>
            <input
              type="text"
              name="companyName"
              placeholder={formData.role === 'GC' ? "Smith Construction" : "Smith Electrical"}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              style={styles.input}
            />
          </div>
          <Button type="submit" disabled={loading} fullWidth size="large">
            {loading ? 'Creating Account...' : 'Get Started'}
          </Button>
          <p style={styles.authFooter}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
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
          <div>
            <h1>Welcome back, {user.name} 👋</h1>
            <p>{user.role === 'GC' ? 'Post jobs and find qualified contractors instantly.' : 'Find jobs and grow your contracting business.'}</p>
          </div>
          <div style={styles.quickStats}>
            <div style={styles.quickStat}>
              <span>Active Jobs</span>
              <strong>0</strong>
            </div>
            <div style={styles.quickStat}>
              <span>Completed</span>
              <strong>0</strong>
            </div>
            <div style={styles.quickStat}>
              <span>Rating</span>
              <strong>⭐ 0.0</strong>
            </div>
          </div>
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

// Placeholder components
const PostJob = () => <div style={styles.pagePlaceholder}>Post Job Page - Coming Soon</div>;
const Jobs = () => <div style={styles.pagePlaceholder}>Jobs Page - Coming Soon</div>;
const MyBids = () => <div style={styles.pagePlaceholder}>My Bids Page - Coming Soon</div>;
const MyJobs = () => <div style={styles.pagePlaceholder}>My Jobs Page - Coming Soon</div>;
const HowItWorks = () => <div style={styles.pagePlaceholder}>How It Works - Coming Soon</div>;

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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/post-job" element={user ? <PostJob /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/my-bids" element={user ? <MyBids /> : <Navigate to="/login" />} />
        <Route path="/my-jobs" element={user ? <MyJobs /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// ========== MODERN STYLES ==========
const styles = {
  // Navigation
  navbar: { background: colors.white, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  navContainer: { maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: colors.primary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcon: { fontSize: '1.8rem' },
  navLinks: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  navLink: { color: colors.dark, textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' },
  registerBtn: { background: colors.primary, color: colors.white, padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s' },
  userMenu: { textAlign: 'right' },
  userName: { display: 'block', fontWeight: '600', color: colors.dark },
  userRole: { display: 'block', fontSize: '0.75rem', color: colors.gray },
  logoutBtn: { background: 'transparent', color: colors.dark, border: `1px solid ${colors.lightGray}`, padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' },
  
  // Hero Section
  hero: { background: colors.gradient, minHeight: '100vh', position: 'relative' },
  heroOverlay: { background: 'rgba(0,0,0,0.1)', minHeight: '100vh', display: 'flex', alignItems: 'center' },
  heroContent: { maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem', color: colors.white },
  badge: { display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.875rem', marginBottom: '2rem' },
  heroTitle: { fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' },
  heroHighlight: { color: colors.secondaryLight },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.5' },
  heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' },
  primaryBtn: { background: colors.white, color: colors.primary, padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s' },
  secondaryBtn: { background: 'transparent', color: colors.white, padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', border: `2px solid ${colors.white}`, fontWeight: '600' },
  
  // Trust Bar
  trustBar: { display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' },
  trustIcon: { fontSize: '1.2rem' },
  
  // Sections
  section: { padding: '5rem 0', background: colors.white },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' },
  sectionHeader: { textAlign: 'center', marginBottom: '3rem' },
  sectionTag: { display: 'inline-block', color: colors.primary, fontWeight: '600', marginBottom: '0.5rem' },
  sectionTitle: { fontSize: '2.5rem', color: colors.dark, marginBottom: '1rem' },
  sectionSubtitle: { color: colors.gray, fontSize: '1.1rem' },
  
  // Features
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' },
  featureCard: { textAlign: 'center', padding: '2rem', borderRadius: '16px', background: colors.white, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s' },
  featureIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  
  // Stats
  statsSection: { background: colors.lightGray, padding: '4rem 0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' },
  statCard: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
  statIcon: { fontSize: '2rem' },
  statValue: { fontSize: '2rem', fontWeight: 'bold', color: colors.primary },
  statLabel: { color: colors.gray },
  
  // Testimonials
  testimonialsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
  testimonialCard: { background: colors.white, padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: `1px solid ${colors.lightGray}` },
  testimonialAuthor: { marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${colors.lightGray}` },
  
  // CTA
  ctaSection: { background: colors.gradient, padding: '4rem 0', textAlign: 'center', color: colors.white },
  ctaContent: { maxWidth: '600px', margin: '0 auto' },
  ctaBtn: { display: 'inline-block', background: colors.white, color: colors.primary, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', marginTop: '1.5rem' },
  
  // Auth
  authContainer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.lightGray, padding: '2rem', gap: '2rem', flexWrap: 'wrap' },
  authSidebar: { maxWidth: '400px', padding: '2rem' },
  authFeatures: { marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  inputGroup: { marginBottom: '1.5rem' },
  input: { width: '100%', padding: '0.75rem 1rem', border: `1px solid ${colors.lightGray}`, borderRadius: '8px', fontSize: '1rem', transition: 'border 0.2s' },
  select: { width: '100%', padding: '0.75rem 1rem', border: `1px solid ${colors.lightGray}`, borderRadius: '8px', fontSize: '1rem', background: colors.white },
  errorMsg: { background: '#FEE2E2', color: colors.danger, padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' },
  authFooter: { marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: colors.gray },
  
  // Cards
  card: { background: colors.white, borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s' },
  cardVariants: { auth: { maxWidth: '450px', width: '100%' }, default: {} },
  cardIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.5rem', marginBottom: '1rem', color: colors.dark },
  
  // Buttons
  button: { border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  buttonSizes: { small: { padding: '0.5rem 1rem', fontSize: '0.875rem' }, medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' }, large: { padding: '1rem 2rem', fontSize: '1rem' } },
  buttonVariants: { primary: { background: colors.primary, color: colors.white }, secondary: { background: colors.lightGray, color: colors.dark } },
  fullWidth: { width: '100%' },
  buttonDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  
  // Dashboard
  dashboard: { minHeight: '100vh', background: colors.lightGray },
  dashboardContent: { maxWidth: '1280px', margin: '0 auto', padding: '2rem' },
  welcomeSection: { background: colors.white, borderRadius: '16px', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  quickStats: { display: 'flex', gap: '2rem' },
  quickStat: { textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' },
  pagePlaceholder: { minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: colors.gray, background: colors.lightGray },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.2rem', color: colors.primary }
};

export default App;
