import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import { getAuthorsData, deleteAuthor, getAuthorDataByID } from '../../../service/AuthorService.js'
import AddAuthorModal from '../../../components/AdminPanel/AddModal/AddAuthorModal/AddAuthorModal.jsx'
import EditAuthorModal from '../../../components/AdminPanel/EditModal/EditAuthorModal/EditAuthorModal.jsx'
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
    const [editOpen, setEditOpen] = useState(false)
    const [selectedAuthor, setSelectedAuthor] = useState(null)
  
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
      getAuthors();
    }, [])

    const refreshAuthors = () => {
      getAuthors();
    };

    const handleDelete = async (id) => {
      try {
        await deleteAuthor(id);
        refreshAuthors();
        alert('Author deleted succesfully');
      } catch (error) {
        console.error('Error deleting author');
      }
    };

    const handleEdit = async (id) => {
      try {
        setSelectedAuthor(await getAuthorDataByID(id));
        setEditOpen(true);
      } catch (error) {
        console.error('Error fetching book data', error);
      }
    }

    return (
      <div className='authors'>
        <div className='info'>
          <h1>Authors</h1>
          <button onClick={() => setOpen(true)}>Add New Author</button>
        </div>
        <DataTable slug="authors" columns={columns} rows={authordata} handleDelete={handleDelete} handleEdit={handleEdit}/>
        {open && <AddAuthorModal slug="author" columns={columns} setOpen={setOpen} refreshAuthors={refreshAuthors}/> }
        {editOpen && <EditAuthorModal slug="category" setOpen={setEditOpen} refreshCategories={refreshAuthors} params={selectedAuthor}/>}
      </div>
    )
  }

export default AuthorListPage
