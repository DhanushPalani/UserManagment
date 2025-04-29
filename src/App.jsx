import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import AddUser from './pages/NewUserForm';

const linkStyle = {
  color: '#61dafb',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  transition: 'background 0.3s',
};

function App() {
  return (
    <BrowserRouter>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        padding: '15px 0',
        backgroundColor: '#282c34',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        borderBottom: '2px solid #444',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/users" style={linkStyle}>👥 Users</Link>
        <Link to="/add-user" style={linkStyle}>➕ Add User</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
