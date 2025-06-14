import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: `<p>Welcome to your first React app! <strong>React</strong> is a powerful library for building user interfaces. <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p><ul><li>JSX</li><li>Components</li><li>Props & State</li></ul>`,
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: `<p>Both <strong>CSS Grid</strong> and <strong>Flexbox</strong> are essential for modern layouts. <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer">Read the CSS Grid Guide</a>.</p><ol><li>Grid: 2D layouts</li><li>Flexbox: 1D layouts</li></ol>`,
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
];

function App() {
  const [posts, setPosts] = React.useState(samplePosts);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // Create new post handler
  const handleCreatePost = (data) => {
    setLoading(true);
    setTimeout(() => {
      const newPost = {
        ...data,
        id: (posts.length + 1).toString(),
        summary: data.content.slice(0, 80) + '...',
        url: `/posts/${posts.length + 1}`,
      };
      setPosts([newPost, ...posts]);
      setLoading(false);
      navigate('/');
    }, 600);
  };

  // Edit post handler
  const handleEditPost = (id, data) => {
    setLoading(true);
    setTimeout(() => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      setLoading(false);
      navigate(`/posts/${id}`);
    }, 600);
  };

  function BlogPostDetailWrapper() {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);
    return post ? (
      <BlogPostDetail
        title={post.title}
        content={post.content}
        author={post.author}
        date={post.date}
      />
    ) : (
      <BlogPostDetail />
    );
  }

  function BlogPostEditWrapper() {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);
    return post ? (
      <BlogPostForm
        post={post}
        loading={loading}
        onSubmit={(data) => handleEditPost(id, data)}
      />
    ) : (
      <p>Post not found.</p>
    );
  }

  return (
    <>
      <h1>Blog Posts</h1>
      <BlogPostList posts={posts} />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/posts/new" element={<BlogPostForm loading={loading} onSubmit={handleCreatePost} />} />
        <Route path="/posts/:id" element={<BlogPostDetailWrapper />} />
        <Route path="/posts/:id/edit" element={<BlogPostEditWrapper />} />
      </Routes>
    </>
  );
}

export default App;
