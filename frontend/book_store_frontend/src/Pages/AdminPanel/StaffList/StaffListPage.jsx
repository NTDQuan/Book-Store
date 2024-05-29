import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import { getStaffData } from '../../../service/FetchStaffData.js'
import AddStaffModal from '../../../components/AdminPanel/AddModal/AddStaffModal/AddStaffModal.jsx'
import './StaffListPage.css'

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


const StaffListPage = () => {
    const [staffData, setStaff] = useState([])
    const [open, setOpen] = useState(false)
  
    const getStaff = async() => {
      try{
        const data = await getStaffData();
        setStaff(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }   
    };
  
    useEffect(() => {
      getStaff()
    }, [])

    return (
      <div className='staff'>
        <div className='info'>
          <h1>Staff</h1>
          <button onClick={() => setOpen(true)}>Add New Staff</button>
        </div>
        <DataTable slug="staff" columns={columns} rows={staffData}/>
        {open && <AddStaffModal slug="staff" columns={columns} setOpen={setOpen}/> }
      </div>
    )
  }

export default StaffListPage
