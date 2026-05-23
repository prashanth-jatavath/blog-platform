import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`);

      alert('Post Deleted');

      fetchPosts();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div className='container'>
      <h1>All Blog Posts</h1>

      <button onClick={logout}>
        Logout
      </button>

      <br />
      <br />

      <Link to='/create'>
        Create New Post
      </Link>

      <br />
      <br />

      {posts.map((post) => (
        <div
          className='post-card'
          key={post._id}
        >
          <h2>{post.title}</h2>

          <p>{post.content}</p>

          <p>
            Author:
            {' '}
            {post.author?.name}
          </p>

          <Link to={`/post/${post._id}`}>
            Read More
          </Link>

          <br />

          <button
            onClick={() =>
              deletePost(post._id)
            }
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;