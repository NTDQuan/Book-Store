import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import { getAuthorsData } from '../../../service/AuthorService.js'
import AddAuthorModal from '../../../components/AdminPanel/AddModal/AddAuthorModal/AddAuthorModal.jsx'
import './AuthorListPage.css'

const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'fullName',
      headerName: 'Name',
      type: String,
      width: 500,
      editable: false,
    }
  ];


const AuthorListPage = () => {
    const [authordata, setAuthors] = useState([])
    const [open, setOpen] = useState(false)
  
    const getAuthors = async() => {
      try{
        const data = await getAuthorsData();
        setAuthors(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }   
    };
  
    useEffect(() => {
      getAuthors()
    }, [])

    const refreshAuthors = () => {
      getAuthors();
    };

    return (
      <div className='authors'>
        <div className='info'>
          <h1>Authors</h1>
          <button onClick={() => setOpen(true)}>Add New Author</button>
        </div>
        <DataTable slug="authors" columns={columns} rows={authordata}/>
        {open && <AddAuthorModal slug="author" columns={columns} setOpen={setOpen} refreshAuthors={refreshAuthors}/> }
      </div>
    )
  }

export default AuthorListPage
