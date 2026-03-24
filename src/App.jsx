// Register Page Component - UPDATED with Company Name field
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
            <option value="CONTRACTOR">I am a Contractor (Electrician, Plumber, etc.)</option>
          </select>
          
          {/* Company Name - shows for GC and Contractors */}
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
              fontWeight: 'bold',
              opacity: loading ? 0.7 : 1
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
