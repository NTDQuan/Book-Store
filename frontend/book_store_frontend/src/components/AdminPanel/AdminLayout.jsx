import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHomeContainer from './Home/Home';
import AdminStaffContainer from '../../Pages/AdminPanel/StaffList/StaffListPage'; // Thêm import cho trang quản lý nhân viên

const AdminLayout = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminHomeContainer />} />
                <Route path="staff" element={<AdminStaffContainer />} /> {/* Thêm route cho trang quản lý nhân viên */}
            </Routes>
        </div>
    );
}

export default AdminLayout;
