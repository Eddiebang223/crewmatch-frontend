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
        
        {/* BUTTONS SECTION - THIS IS WHAT YOU NEED */}
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

        {/* Feature Boxes */}
        <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>📋</h3>
            <h3>Post Jobs</h3>
            <p>GCs post jobs with rates and requirements</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>🤝</h3>
            <h3>AI Matching</h3>
            <p>Smart matching based on skills and location</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>💳</h3>
            <h3>Instant Payments</h3>
            <p>Secure payments through Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Login Page Component
function Login() {
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
        <form>
          <input 
            type="email" 
            placeholder="Email" 
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
            placeholder="Password" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <button style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#667eea', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Sign In
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
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Create Account</h2>
        <form>
          <input 
            type="text" 
            placeholder="Full Name" 
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
            placeholder="Email" 
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
            placeholder="Password" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              fontSize: '16px'
            }} 
          />
          <select style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            fontSize: '16px'
          }}>
            <option>I am a General Contractor (GC)</option>
            <option>I am a Contractor</option>
          </select>
          <button style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#667eea', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Register
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
