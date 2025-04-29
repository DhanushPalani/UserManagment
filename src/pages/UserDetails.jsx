import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error();

        const data = await response.json();
        setUser(data);
      } catch {
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const localUser = localUsers.find((u) => u.id.toString() === id);
        setUser(localUser || null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) return <h2>Loading user details...</h2>;
  if (!user) return <h2>User not found.</h2>;

  return (
    <div style={{ padding: '30px' }}>
      <h1>👤 User Details</h1>
      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        margin: 'auto',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <img
          src={user.image || 'https://via.placeholder.com/150'}
          alt={user.firstName}
          width="150"
          height="150"
          style={{ borderRadius: '50%' }}
        />
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>University:</strong> {user.university || 'N/A'}</p>
        <button style={{ marginTop: '20px' }} onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
}

export default UserDetails;
