package com.cnjava.book_store.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffServiceImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

    @Override
    public Staff getStaffById(Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    @Override
    public void createStaff(Staff staff) {
        staffRepository.save(staff);
    }

    @Override
    public boolean updateStaff(Long id, Staff staff) {
        if (staffRepository.existsById(id)) {
            staff.setId(id);
            staffRepository.save(staff);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteStaffById(Long id) {
        if (staffRepository.existsById(id)) {
            staffRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public Staff findByUsername(String username) {
        return staffRepository.findByUsername(username);
    }
}
