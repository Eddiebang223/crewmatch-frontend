import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ========== HOME COMPONENT ==========
function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚀 CrewMatch</h1>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>
          Connect Specialty Trade Contractors with General Contractors
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/register" style={{ padding: '12px 30px', background: 'white', color: '#667eea', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Get Started</Link>
          <Link to="/login" style={{ padding: '12px 30px', background: 'transparent', color: 'white', textDecoration: 'none', borderRadius: '8px', border: '2px solid white', fontWeight: 'bold' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}

// ========== LOGIN COMPONENT ==========
function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', margin: '20px', padding: '40px', background: 'white', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign In</h2>
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

// ========== REGISTER COMPONENT ==========
function Register() {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', role: 'GC', companyName: '' });
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => { window.location.href = '/dashboard'; }, 2000);
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '450px', width: '100%', margin: '20px', padding: '40px', background: 'white', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account</h2>
        {message && <div style={{ background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <option value="GC">General Contractor (GC)</option>
            <option value="CONTRACTOR">Contractor</option>
          </select>
          <input type="text" name="companyName" placeholder={formData.role === 'GC' ? "Company Name" : "Business Name"} value={formData.companyName} onChange={handleChange} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

// ========== DASHBOARD COMPONENT ==========
function Dashboard() {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  if (!user) return <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2 style={{ color: 'white' }}>Loading...</h2></div>;
  
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px 30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#667eea' }}>🚀 CrewMatch</h2>
        <div><span style={{ marginRight: '20px', color: '#666' }}>Welcome, {user.name}!</span><button onClick={handleLogout} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button></div>
      </div>
      <div style={{ background: 'white', borderRadius: '10px', padding: '30px', textAlign: 'center', marginBottom: '30px' }}>
        <h1>Welcome to CrewMatch! 🎉</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>{user.role === 'GC' ? 'Post jobs and find qualified contractors instantly.' : 'Find jobs and grow your contracting business.'}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {user.role === 'GC' ? (
          <>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}><h2>📋</h2><h3>Post New Job</h3><button onClick={() => window.location.href = '/post-job'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post Job</button></div>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}><h2>👥</h2><h3>View Jobs</h3><button onClick={() => window.location.href = '/my-jobs'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Jobs</button></div>
          </>
        ) : (
          <>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}><h2>🔍</h2><h3>Find Jobs</h3><button onClick={() => window.location.href = '/jobs'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse Jobs</button></div>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}><h2>📝</h2><h3>My Bids</h3><button onClick={() => window.location.href = '/my-bids'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Bids</button></div>
          </>
        )}
      </div>
    </div>
  );
}

// ========== POST JOB COMPONENT ==========
function PostJob() {
  const [formData, setFormData] = React.useState({
    title: '', trade: 'ELECTRICIAN', description: '', location: '', startDate: '', endDate: '', hours: '', rateMin: '', rateMax: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const trades = ['ELECTRICIAN', 'PLUMBER', 'HVAC', 'CARPENTER', 'MASON', 'PAINTER', 'ROOFER', 'OTHER'];

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Job posted successfully!');
        setTimeout(() => { window.location.href = '/dashboard'; }, 2000);
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '10px', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Post a New Job</h1>
          <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '8px 16px', background: '#ddd', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
        </div>
        {message && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '5px', marginBottom: '20px' }}>{message}</div>}
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '5px', marginBottom: '20px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <select name="trade" value={formData.trade} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>{trades.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <input type="number" name="hours" placeholder="Hours" value={formData.hours} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <input type="number" name="rateMin" placeholder="Min Rate" value={formData.rateMin} onChange={handleChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <input type="number" name="rateMax" placeholder="Max Rate" value={formData.rateMax} onChange={handleChange} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'Posting...' : 'Post Job'}</button>
        </form>
      </div>
    </div>
  );
}

// ========== JOBS COMPONENT (with Bidding) ==========
function Jobs() {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [bidAmount, setBidAmount] = React.useState('');
  const [bidMessage, setBidMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
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
    if (!bidAmount) {
      alert('Please enter a bid amount');
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bids`, {
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
      } else {
        alert(data.error || 'Failed to submit bid');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2 style={{ color: 'white' }}>Loading jobs...</h2></div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px 30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Available Jobs</h1>
          <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
        </div>
        {successMessage && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{successMessage}</div>}
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
        {jobs.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '10px', padding: '60px', textAlign: 'center' }}>
            <h2>No jobs available</h2>
            <button onClick={() => window.location.href = '/dashboard'} style={{ marginTop: '20px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back to Dashboard</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {jobs.map(job => (
              <div key={job.id} style={{ background: 'white', borderRadius: '10px', padding: '25px' }}>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <div>📍 {job.location} | ⏰ {job.hours} hrs | 💰 ${job.rateMin}-${job.rateMax}/hr</div>
                <button onClick={() => setSelectedJob(job)} style={{ marginTop: '15px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Bid</button>
              </div>
            ))}
          </div>
        )}
        {selectedJob && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '30px', maxWidth: '500px', width: '90%' }}>
              <h2>Submit Bid for {selectedJob.title}</h2>
              <input type="number" placeholder="Your Bid ($/hour)" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
              <textarea placeholder="Message (optional)" value={bidMessage} onChange={(e) => setBidMessage(e.target.value)} rows="3" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
              <button onClick={handleBid} disabled={submitting} style={{ width: '100%', padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{submitting ? 'Submitting...' : 'Submit Bid'}</button>
              <button onClick={() => setSelectedJob(null)} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#ddd', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== MY BIDS COMPONENT ==========
function MyBids() {
  const [bids, setBids] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => { fetchMyBids(); }, []);

  const fetchMyBids = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/my-bids`, {
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

  const getStatusColor = (status) => {
    if (status === 'ACCEPTED') return '#28a745';
    if (status === 'REJECTED') return '#dc3545';
    return '#ffc107';
  };

  if (loading) return <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2 style={{ color: 'white' }}>Loading your bids...</h2></div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px 30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>My Bids</h1>
          <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
        </div>
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '5px', marginBottom: '20px' }}>{error}</div>}
        {bids.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '10px', padding: '60px', textAlign: 'center' }}>
            <h2>No bids submitted yet</h2>
            <button onClick={() => window.location.href = '/jobs'} style={{ marginTop: '20px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Browse Jobs</button>
          </div>
        ) : (
          bids.map(bid => (
            <div key={bid.id} style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Job #{bid.jobId}</h3>
                <span style={{ padding: '4px 12px', background: getStatusColor(bid.status), color: 'white', borderRadius: '20px', fontSize: '12px' }}>{bid.status}</span>
              </div>
              <p><strong>Your Bid:</strong> ${bid.proposedRate}/hour</p>
              {bid.message && <p><strong>Message:</strong> {bid.message}</p>}
              <p style={{ color: '#999', fontSize: '12px' }}>Submitted: {new Date(bid.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ========== MAIN APP COMPONENT ==========
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/my-bids" element={<MyBids />} />
      </Routes>
    </Router>
  );
}

export default App;
