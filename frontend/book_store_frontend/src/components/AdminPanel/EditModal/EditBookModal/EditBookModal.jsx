import React, { useState, useEffect } from 'react'
import { getCategoriesData } from '../../../../service/CategoryService'
import { getAuthorsData } from '../../../../service/AuthorService'
import { updateBook } from '../../../../service/BookService'
import './EditBookModal.css'

const EditBookModal = (props) => {
    const { slug, setOpen, refreshBooks, params } = props;
    const [file, setFile] = useState();
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]) 
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        stock: '',
        author: '',
        category: '',
        price: '',
        description: '',
        cover_image: ''
    });

    useEffect(() => {
        getCategoriesData().then(data => setCategories(data))
        getAuthorsData().then(data => setAuthors(data))
        
        if(params) {
            setFormData({
                title: params.title,
                stock: params.stock,
                author: params.author,
                category: params.category,
                price: params.price,
                description: params.description,
                cover_image: ''
            })
        }
    }, [params])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBook(params.id, formData);
        setLoading(true);
        try {

            setLoading(false);
            setOpen(false);
            alert('Updated')
            refreshBooks();
        } catch (error) {
            console.error('Error updating book', error);
            setLoading(false);
        }
    }

    return (
        <div className="editBookModal">
        <div className="modal">
            <span className="close" onClick={() => setOpen(false)}>X</span>
            <h1>Edit {slug}</h1>
            <form onSubmit={handleSubmit}>
            <div className='item'>
                <label>{'Title'}</label>
                <input 
                    className='input' 
                    name="title" 
                    type='text' 
                    placeholder={'title'} 
                    value={formData.title}
                    onChange={handleInputChange}
                    required 
                />
            </div>
            <div className='item'>
                <label>{'Stock'}</label>
                <input 
                    className='input' 
                    name="stock" 
                    type='number' 
                    placeholder={'stock'} 
                    value={formData.stock}
                    onChange={handleInputChange}
                    required 
                />
            </div>   
            <div className='item'>
                <label>{'Author'}</label>
                <select 
                    className='input' 
                    name='author' 
                    value={formData.author.id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">--Select author--</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.fullName}</option>
                    ))}
                </select>
            </div>
            <div className='item'>
                <label>{'Category'}</label>
                <select 
                    className='input' 
                    name='category' 
                    value={formData.category.id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">--Select category--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className='item'>
                <label>{'Price'}</label>
                <input 
                    className='input' 
                    name='price' 
                    type='number' 
                    placeholder={'price'} 
                    value={formData.price}
                    onChange={handleInputChange}
                    required 
                />
            </div>  
            <div className='item'>
                <label>Description</label>
                <textarea 
                    className='input_textarea' 
                    name='description' 
                    rows="4" 
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <div className='item'>
                <label>{'Cover image'}</label>
                <input 
                    className='input' 
                    type="file" 
                    name='cover_image' 
                    onChange={handleFileChange}
                />
            </div>  
            <button disabled={loading}>
                {loading ? 'Loading...' : 'Edit'}
            </button>
            </form>
        </div>
        </div>
    )
}

export default EditBookModal