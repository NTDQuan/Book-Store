package com.cnjava.book_store.Staff;

public class StaffMapper {
    public static StaffDTO toDTO(Staff staff) {
        StaffDTO dto = new StaffDTO();
        dto.setId(staff.getId());
        dto.setFullName(staff.getFullName());
        dto.setBirthDate(staff.getBirthDate());
        dto.setPhoneNumber(staff.getPhoneNumber());
        dto.setAddress(staff.getAddress());
        dto.setUsername(staff.getUsername());
        dto.setPassword(staff.getPassword());
        return dto;
    }

    public static Staff toEntity(StaffDTO dto) {
        Staff staff = new Staff();
        staff.setId(dto.getId());
        staff.setFullName(dto.getFullName());
        staff.setBirthDate(dto.getBirthDate());
        staff.setPhoneNumber(dto.getPhoneNumber());
        staff.setAddress(dto.getAddress());
        staff.setUsername(dto.getUsername());
        staff.setPassword(dto.getPassword());
        return staff;
    }
}
