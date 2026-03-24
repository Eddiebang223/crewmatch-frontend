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
            fontWeight: 'bold'
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
            fontWeight: 'bold'
          }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

// Login Component
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
        borderRadius: '10px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign In</h2>
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px' 
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px' 
            }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px' 
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
              cursor: 'pointer' 
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

// Register Component
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
        setTimeout(() => { 
          window.location.href = '/dashboard'; 
        }, 2000);
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
        borderRadius: '10px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account</h2>
        {message && (
          <div style={{ 
            background: '#d4edda', 
            color: '#155724', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px' 
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
            marginBottom: '15px' 
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px' 
            }} 
          />
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
              borderRadius: '5px' 
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
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px' 
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
              borderRadius: '5px' 
            }}>
            <option value="GC">General Contractor (GC)</option>
            <option value="CONTRACTOR">Contractor</option>
          </select>
          <input 
            type="text" 
            name="companyName" 
            placeholder={formData.role === 'GC' ? "Company Name" : "Business Name"} 
            value={formData.companyName} 
            onChange={handleChange} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px' 
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
              cursor: 'pointer' 
            }}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
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
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '20px 30px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#667eea' }}>🚀 CrewMatch</h2>
        <div>
          <span style={{ marginRight: '20px', color: '#666' }}>Welcome, {user.name}!</span>
          <button onClick={handleLogout} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1>Welcome to CrewMatch! 🎉</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          {user.role === 'GC' 
            ? 'Post jobs and find qualified contractors instantly.'
            : 'Find jobs and grow your contracting business.'}
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {user.role === 'GC' ? (
          <>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}>
              <h2>📋</h2>
              <h3>Post New Job</h3>
              <button onClick={() => window.location.href = '/post-job'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Post Job
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}>
              <h2>👥</h2>
              <h3>View Jobs</h3>
              <button onClick={() => window.location.href = '/my-jobs'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                View Jobs
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}>
              <h2>🔍</h2>
              <h3>Find Jobs</h3>
              <button onClick={() => window.location.href = '/jobs'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Browse Jobs
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: '10px', padding: '25px', textAlign: 'center' }}>
              <h2>📝</h2>
              <h3>My Bids</h3>
              <button onClick={() => window.location.href = '/my-bids'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                View Bids
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// PostJob Component (placeholder for now)
function PostJob() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '10px', padding: '40px', maxWidth: '600px', textAlign: 'center' }}>
        <h1>Post a New Job</h1>
        <p>Job posting form coming soon!</p>
        <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// Jobs Component (placeholder)
function Jobs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '10px', padding: '40px', maxWidth: '600px', textAlign: 'center' }}>
        <h1>Available Jobs</h1>
        <p>Job listings coming soon!</p>
        <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// Main App Component
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
      </Routes>
    </Router>
  );
}

export default App;
