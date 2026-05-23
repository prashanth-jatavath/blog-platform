import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', formData);

      alert('Registration Successful');

      navigate('/login');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Enter Name'
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          onChange={handleChange}
        />

        <br />
        <br />

        <button type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;