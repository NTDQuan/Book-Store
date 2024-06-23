package com.cnjava.book_store.Staff;

import java.util.List;

public interface StaffService {
    List<Staff> findAll();

    Staff getStaffById(Long id);

    void createStaff(Staff staff);

    boolean updateStaff(Long id, Staff staff);

    boolean deleteStaffById(Long id);
}
