import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './DataTable.css'
import { Link } from 'react-router-dom';
import deleteIcon from '../../../assets/delete_icon.svg'
import editIcon from '../../../assets/edit_icon.svg'

const DataTable = (props) => {
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='action'>
                        <Link onClick={() => props.handleEdit(params.row.id)}>
                            <div>
                               <img src={editIcon} alt='Edit'/> 
                            </div>
                        </Link>
                        <Link onClick={() => props.handleDelete(params.row.id)}>
                            <div>
                                <img src={deleteIcon} alt='Delete'/>   
                            </div>
                        </Link>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='BookListDataTable'>
            <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...props.columns, ...actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter:true,
                        quickFilterProps: { debounceMs: 500}
                    }
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    )
}

export default DataTable