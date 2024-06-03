import React, { useState, useEffect } from 'react';
import './EditAuthorModal.css';
import { updateAuthor } from '../../../../service/AuthorService.js';

const EditAuthorModal = (props) => {
  const { slug, setOpen, refreshCategories, params } = props;
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params) {
        setFullName(params.fullName);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const jsonData = { fullName };
    
    try {
      await updateAuthor(params.id, jsonData);
      setLoading(false);
      setOpen(false);
      refreshCategories();
      alert('Author updated successfully');
    } catch (error) {
      console.error('Error updating author', error);
      setLoading(false);
    }
  };

  return (
    <div className="editAuthorModal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label>Category name</label>
            <input
              className='input'
              name="fullName"
              type='text'
              placeholder='Full name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Edit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAuthorModal;