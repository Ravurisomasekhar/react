// components/BlogPostList/BlogPostList.js
import React from 'react';
import BlogPostItem from '../BlogPostItem/BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.emptyMessage}>No blog posts available.</p>;
  }

  

export default BlogPostList;
