import React, { useState, useEffect } from 'react';
import './EditCategoryModal.css';
import { updateCategory } from '../../../../service/CategoryService.js';

const EditCategoryModal = (props) => {
  const { slug, setOpen, refreshCategories, params } = props;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params) {
      setName(params.name);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const jsonData = { name };
    
    try {
      await updateCategory(params.id, jsonData);
      setLoading(false);
      setOpen(false);
      refreshCategories();
      alert('Category updated successfully');
    } catch (error) {
      console.error('Error updating category', error);
      setLoading(false);
    }
  };

  return (
    <div className="editCategoryModal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Edit {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label>Category name</label>
            <input
              className='input'
              name="name"
              type='text'
              placeholder='Category title'
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default EditCategoryModal;