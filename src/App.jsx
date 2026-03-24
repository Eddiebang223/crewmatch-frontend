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

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; 
