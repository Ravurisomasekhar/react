import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.empty}>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
      <div className={styles.headerRow}>
        <Link to="/posts/new" className={styles.newPostButton}>+ New Post</Link>
      </div>
      {posts.map(post => (
        <div key={post.id} className={styles.item}>
          <Link to={post.url} className={styles.title}>{post.title}</Link>
          <div className={styles.meta}>
            <span>By {post.author}</span> | <span>{post.date}</span>
            <Link to={`/posts/${post.id}/edit`} className={styles.editButton}>Edit</Link>
          </div>
          <div className={styles.summary}>{post.summary}</div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
