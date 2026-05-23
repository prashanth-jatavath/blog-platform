import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);

      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(
        `/comments/${id}`
      );

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/comments/${id}`, {
        text,
      });

      alert('Comment Added');

      setText('');

      fetchComments();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!post) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <p>
        Author:
        {' '}
        {post.author?.name}
      </p>

      <hr />

      <h2>Comments</h2>

      <form onSubmit={addComment}>
        <textarea
          rows='4'
          cols='40'
          placeholder='Write Comment'
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <br />
        <br />

        <button type='submit'>
          Add Comment
        </button>
      </form>

      <hr />

      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>

          <p>
            By:
            {' '}
            {comment.user?.name}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostDetails;