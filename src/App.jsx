import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Homepage Component
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
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          🚀 CrewMatch
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>
          Connect Specialty Trade Contractors with General Contractors
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/register" style={{
            padding: '12px 30px',
            background: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Get Started
          </Link>
          <Link to="/login" style={{
            padding: '12px 30px',
            background: 'transparent',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            border: '2px solid white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Sign In
          </Link>
        </div>

        <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3>📋 Post Jobs</h3>
            <p>GCs post jobs with rates and requirements</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3>🤝 AI Matching</h3>
            <p>Smart matching based on skills and location</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3>💳 Instant Payments</h3>
            <p>Secure payments through Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Login Page Component
function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%',
        margin: '20px', 
        padding: '40px', 
        background: 'white', 
        borderRadius: '10px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign In</h2>
        
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Don't have an account? <Link to="/register" style={{ color: '#667eea' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

// Register Page Component
function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'GC',
    companyName: ''
  });
  
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          companyName: formData.companyName
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        margin: '20px', 
        padding: '40px', 
        background: 'white', 
        borderRadius: '10px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Create Account</h2>
        
        {message && (
          <div style={{ 
            background: '#d4edda', 
            color: '#155724', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}
        
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Full Name *" 
            value={formData.name}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email *" 
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password *" 
            value={formData.password}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }}>
            <option value="GC">I am a General Contractor (GC)</option>
            <option value="CONTRACTOR">I am a Contractor</option>
          </select>
          
          <input 
            type="text" 
            name="companyName"
            placeholder={formData.role === 'GC' ? "Company Name *" : "Business Name"}
            value={formData.companyName}
            onChange={handleChange}
            required={formData.role === 'GC'}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
function Dashboard() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <h2 style={{ color: 'white' }}>Loading...</h2>
      </div>
    );
  }
  
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Navigation Bar */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '15px 30px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, color: '#667eea' }}>🚀 CrewMatch</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ color: '#666' }}>Welcome, {user?.name || 'User'}!</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Welcome Section */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>
          Welcome to CrewMatch! 🎉
        </h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          {user?.role === 'GC' 
            ? 'Post jobs and find qualified contractors instantly.'
            : 'Find jobs and grow your contracting business.'}
        </p>
      </div>
      
      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {user?.role === 'GC' ? (
          <>
            <FeatureCard
              icon="📋"
              title="Post New Job"
              description="Create a job posting for contractors to bid on"
              buttonText="Post Job"
              onClick={() => window.location.href = '/post-job'}
            />
            <FeatureCard
              icon="👥"
              title="View Jobs"
              description="See all your active and past jobs"
              buttonText="View Jobs"
              onClick={() => window.location.href = '/my-jobs'}
            />
            <FeatureCard
              icon="💳"
              title="Payments"
              description="Manage payments and invoices"
              buttonText="View Payments"
              onClick={() => window.location.href = '/payments'}
            />
          </>
        ) : (
          <>
            <FeatureCard
              icon="🔍"
              title="Find Jobs"
              description="Browse available jobs in your area"
              buttonText="Browse Jobs"
              onClick={() => window.location.href = '/jobs'}
            />
            <FeatureCard
              icon="📝"
              title="My Bids"
              description="Track your submitted bids"
              buttonText="View Bids"
              onClick={() => window.location.href = '/my-bids'}
            />
            <FeatureCard
              icon="💰"
              title="Earnings"
              description="Track your completed jobs and earnings"
              buttonText="View Earnings"
              onClick={() => window.location.href = '/earnings'}
            />
          </>
        )}
      </div>
      
      {/* Quick Stats */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Quick Stats</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <StatBox number="0" label="Active Jobs" />
          <StatBox number="0" label="Completed" />
          <StatBox number="0" label="Total Earned" />
          <StatBox number="⭐ 0.0" label="Rating" />
        </div>
      </div>
    </div>
  );
}

// Feature Card Component - Add this after Dashboard
function FeatureCard({ icon, title, description, buttonText, onClick }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '25px',
      textAlign: 'center',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>{icon}</div>
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{title}</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>{description}</p>
      <button
        onClick={onClick}
        style={{
          padding: '10px 20px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Stat Box Component - Add this after FeatureCard
function StatBox({ number, label }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>{number}</div>
      <div style={{ color: '#666', marginTop: '5px' }}>{label}</div>
    </div>
  );
}
// Post Job Page - For GCs to create new jobs
function PostJob() {
  const [formData, setFormData] = React.useState({
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
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const trades = ['ELECTRICIAN', 'PLUMBER', 'HVAC', 'CARPENTER', 'MASON', 'PAINTER', 'ROOFER', 'OTHER'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Job posted successfully!');
        setTimeout(() => {
          window.location.href = '/dashboard';
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '10px', color: '#333' }}>Post a New Job</h1>
        <p style={{ marginBottom: '30px', color: '#666' }}>Fill out the details below to find qualified contractors</p>

        {message && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              placeholder="e.g., Commercial Electrical Installation"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Trade *</label>
            <select
              name="trade"
              value={formData.trade}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              {trades.map(trade => (
                <option key={trade} value={trade}>{trade}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              placeholder="Describe the scope of work, requirements, etc."
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              placeholder="City, State or full address"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Hours *</label>
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                placeholder="Total hours"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Min Rate ($/hr)</label>
              <input
                type="number"
                name="rateMin"
                value={formData.rateMin}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                placeholder="Min"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Max Rate ($/hr)</label>
              <input
                type="number"
                name="rateMax"
                value={formData.rateMax}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                placeholder="Max"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
// Jobs Page - For contractors to view and bid on jobs
function Jobs() {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [bidAmount, setBidAmount] = React.useState('');
  const [bidMessage, setBidMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setJobs(data.jobs || []);
      } else {
        setError(data.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (jobId) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: jobId,
          proposedRate: parseFloat(bidAmount),
          message: bidMessage
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Bid submitted successfully!');
        setSelectedJob(null);
        setBidAmount('');
        setBidMessage('');
        fetchJobs(); // Refresh job list
      } else {
        alert(data.error || 'Failed to submit bid');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <h2 style={{ color: 'white' }}>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '20px 30px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, color: '#333' }}>Available Jobs</h1>
          <button
            onClick={() => window.location.href = '/dashboard'}
            style={{
              padding: '8px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {jobs.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#666' }}>No jobs available right now</h2>
            <p style={{ color: '#999' }}>Check back later for new opportunities!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onBid={() => setSelectedJob(job)}
              />
            ))}
          </div>
        )}

        {/* Bid Modal */}
        {selectedJob && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%'
            }}>
              <h2 style={{ marginBottom: '20px' }}>Submit Bid</h2>
              <p><strong>{selectedJob.title}</strong></p>
              <p style={{ color: '#666', marginBottom: '20px' }}>{selectedJob.description}</p>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Your Bid Rate ($/hour)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Suggested: $${selectedJob.rateMin} - $${selectedJob.rateMax}`}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Message (optional)
                </label>
                <textarea
                  value={bidMessage}
                  onChange={(e) => setBidMessage(e.target.value)}
                  rows="3"
                  placeholder="Tell the GC why you're the best fit..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleBid(selectedJob.id)}
                  disabled={submitting || !bidAmount}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: submitting || !bidAmount ? 'not-allowed' : 'pointer',
                    opacity: submitting || !bidAmount ? 0.6 : 1
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Bid'}
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  style={{
                    padding: '12px 20px',
                    background: '#ddd',
                    color: '#666',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Job Card Component
function JobCard({ job, onBid }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>{job.title}</h2>
        <span style={{
          padding: '4px 12px',
          background: '#e3f2fd',
          color: '#1976d2',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {job.trade}
        </span>
      </div>
      
      <p style={{ color: '#666', marginBottom: '15px' }}>{job.description}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
        <span style={{ color: '#666', fontSize: '14px' }}>📍 {job.location}</span>
        <span style={{ color: '#666', fontSize: '14px' }}>
          📅 {new Date(job.startDate).toLocaleDateString()} - {new Date(job.endDate).toLocaleDateString()}
        </span>
        <span style={{ color: '#666', fontSize: '14px' }}>⏰ {job.hours} hours</span>
        <span style={{ color: '#667eea', fontSize: '14px', fontWeight: 'bold' }}>
          💰 ${job.rateMin} - ${job.rateMax}/hr
        </span>
      </div>
      
      <button
        onClick={onBid}
        style={{
          width: '100%',
          padding: '12px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Submit Bid
      </button>
    </div>
  );
}
// ========== EXISTING APP COMPONENT - UPDATE THE ROUTES ==========
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* ← ADD THIS LINE */}
        <Route path="/post-job" element={<PostJob />} /> 
        <Route path="/jobs" element={<Jobs />} /> 
      </Routes>
    </Router>
  );
}

export default App;

