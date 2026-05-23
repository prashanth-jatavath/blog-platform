import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
      await API.post('/posts', formData);

      alert('Post Created Successfully');

      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Enter Title'
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name='content'
          placeholder='Enter Content'
          rows='6'
          cols='40'
          onChange={handleChange}
        />

        <br />
        <br />

        <button type='submit'>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;