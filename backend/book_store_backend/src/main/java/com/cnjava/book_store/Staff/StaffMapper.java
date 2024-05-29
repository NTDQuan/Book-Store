package com.cnjava.book_store.Staff;

public class StaffMapper {
    public static Staff toEntity(StaffDTO staffDTO) {
        Staff staff = new Staff();
        staff.setId(staffDTO.getId());
        staff.setFullName(staffDTO.getFullName());
        staff.setBirthDate(staffDTO.getBirthDate());
        staff.setPhoneNumber(staffDTO.getPhoneNumber());
        staff.setAddress(staffDTO.getAddress());
        return staff;
    }

    public static StaffDTO toDTO(Staff foundStaff) {
        StaffDTO staffDTO = new StaffDTO();
        staffDTO.setId(foundStaff.getId());
        staffDTO.setFullName(foundStaff.getFullName());
        staffDTO.setBirthDate(foundStaff.getBirthDate());
        staffDTO.setPhoneNumber(foundStaff.getPhoneNumber());
        staffDTO.setAddress(foundStaff.getAddress());
        return staffDTO;
    }
}
