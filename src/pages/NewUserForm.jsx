import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [university, setUniversity] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      gender,
      age,
      university,
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/users');
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
        <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
        <input type="text" placeholder="University" value={university} onChange={e => setUniversity(e.target.value)} required />
        <button type="submit" style={{ padding: '10px' }}>Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
