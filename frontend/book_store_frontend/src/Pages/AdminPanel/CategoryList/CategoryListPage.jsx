import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import { getCategoriesData, deleteCategory, getCategoryDataByID } from '../../../service/CategoryService.js'
import AddCategoryModal from '../../../components/AdminPanel/AddModal/AddCategoryModal/AddCategoryModal.jsx'
import EditCategoryModal from '../../../components/AdminPanel/EditModal/EditCategoryModal/EditCategoryModal.jsx'
import './CategoryListPage.css'

const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Category',
      type: String,
      width: 500,
      editable: false,
    }
  ];


const CategoryListPage = () => {
    const [categorydata, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
  
    const getCategories = async() => {
      try{
        const data = await getCategoriesData();
        setCategories(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }   
    };
  
    useEffect(() => {
      getCategories()
    }, [])

    const refreshCategories = () => {
      getCategories();
    };

    const handleDelete = async (id) => {
      try {
        await deleteCategory(id);
        refreshCategories();
        alert('Category deleted successfully');
      } catch (error) {
        console.error('Error deleting category', error);
      }
    };

    const handleEdit = async (id) => {
      try {
        setSelectedCategory(await getCategoryDataByID(id));
        setEditOpen(true);
      } catch (error) {
        console.error('Error fetching book data', error);
      }
    }

    return (
      <div className='categories'>
        <div className='info'>
          <h1>Categories</h1>
          <button onClick={() => setOpen(true)}>Add New Category</button>
        </div>
        <DataTable slug="categories" columns={columns} rows={categorydata} handleDelete={handleDelete} handleEdit={handleEdit}/>
        {open && <AddCategoryModal slug="category" setOpen={setOpen} refreshCategories={refreshCategories}/> }
        {editOpen && <EditCategoryModal slug="category" setOpen={setEditOpen} refreshCategories={refreshCategories} params={selectedCategory}/>}
      </div>
    )
  }

export default CategoryListPage
