import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn = false, userName = '' }) => {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!isLoggedIn && !name.trim()) newErrors.name = 'Name required';
    if (!text.trim()) newErrors.text = 'Comment required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name: isLoggedIn ? userName : name,
        text,
        date: new Date().toISOString(),
      });
      setText('');
      if (!isLoggedIn) setName('');
    }
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit} noValidate>
      {!isLoggedIn && (
        <div className={styles.formGroup}>
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'comment-name-error' : undefined}
          />
          {errors.name && (
            <span id="comment-name-error" className={styles.error} role="alert">
              {errors.name}
            </span>
          )}
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          aria-invalid={!!errors.text}
          aria-describedby={errors.text ? 'comment-text-error' : undefined}
        />
        {errors.text && (
          <span id="comment-text-error" className={styles.error} role="alert">
            {errors.text}
          </span>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
