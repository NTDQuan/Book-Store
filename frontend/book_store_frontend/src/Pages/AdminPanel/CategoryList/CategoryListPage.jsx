import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import { getCategoriesData } from '../../../service/FetchCategoryData.js'
import AddCategoryModal from '../../../components/AdminPanel/AddModal/AddCategoryModal/AddCategoryModal.jsx'
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
    const [categorydata, setCategorys] = useState([])
    const [open, setOpen] = useState(false)
  
    const getCategorys = async() => {
      try{
        const data = await getCategoriesData();
        setCategorys(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }   
    };
  
    useEffect(() => {
      getCategorys()
    }, [])

    return (
      <div className='categories'>
        <div className='info'>
          <h1>Categories</h1>
          <button onClick={() => setOpen(true)}>Add New Category</button>
        </div>
        <DataTable slug="categories" columns={columns} rows={categorydata}/>
        {open && <AddCategoryModal slug="category" columns={columns} setOpen={setOpen}/> }
      </div>
    )
  }

export default CategoryListPage
