package com.cnjava.book_store.Staff;

public class StaffMapper {
    public static Staff toEntity(StaffDTO staffDTO) {
        Staff staff = new Staff();
        staff.setName(staffDTO.getName());
        staff.setPosition(staffDTO.getPosition());
        staff.setDepartment(staffDTO.getDepartment());
        return staff;
    }

    public static StaffDTO toDTO(Staff staff) {
        StaffDTO staffDTO = new StaffDTO();
        staffDTO.setName(staff.getName());
        staffDTO.setPosition(staff.getPosition());
        staffDTO.setDepartment(staff.getDepartment());
        return staffDTO;
    }
}
