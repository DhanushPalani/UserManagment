import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        const apiUsers = data.users;

        const localUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Tagging local users for identification (optional)
        const localUsersTagged = localUsers.map(user => ({
          ...user,
          isLocal: true,
          image: user.image || 'https://via.placeholder.com/100?text=No+Image'
        }));

        const allUsers = [...apiUsers, ...localUsersTagged];
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <h2>Loading users...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>👥 Users List</h1>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Link to="/add-user">
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>➕ Add New User</button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '250px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={user.image || 'https://via.placeholder.com/100?text=User'}
              alt={`${user.firstName}`}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <h3>{user.firstName} {user.lastName}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>University:</strong> {user.university || 'N/A'}</p>
            {user.isLocal && <span style={{ color: 'green', fontWeight: 'bold' }}>🗃️ Local User</span>}
            <div style={{ marginTop: '10px' }}>
              <Link to={`/users/${user.id}`} state={{ user }}>
                <button style={{ padding: '6px 12px', cursor: 'pointer' }}>👁 View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
