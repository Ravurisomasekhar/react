import React, { useState } from 'react';
import styles from './BlogPostDetail.module.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const BlogPostDetail = ({ title, content, author, date }) => {
  // Comments state for this post
  const [comments, setComments] = useState([]);

  const handleAddComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default BlogPostDetail;
