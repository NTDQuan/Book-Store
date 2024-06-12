package com.cnjava.book_store.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cnjava.book_store.User.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class StaffController {

    private final StaffService staffService;
    private final UserService userService;

    @Autowired
    public StaffController(StaffService staffService, UserService userService) {
        this.staffService = staffService;
        this.userService = userService;
    }
    
    @GetMapping("/staffs")
    public ResponseEntity<List<StaffDTO>> findAllStaffs() {
        List<Staff> staffs = staffService.findAll();
        List<StaffDTO> staffDTOs = staffs.stream()
                                         .map(StaffMapper::toDTO)
                                         .collect(Collectors.toList());
        return ResponseEntity.ok(staffDTOs);
    }

    @GetMapping("/staffs/{id}")
    public ResponseEntity<StaffDTO> getStaffById(@PathVariable Long id) {
        Staff foundStaff = staffService.getStaffById(id);
        if (foundStaff != null) {
            return new ResponseEntity<>(StaffMapper.toDTO(foundStaff), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/staffs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addNewStaff(@RequestBody StaffDTO newStaffDTO) {
        Staff newStaff = StaffMapper.toEntity(newStaffDTO);
        staffService.createStaff(newStaff);
        return new ResponseEntity<>("Staff added successfully", HttpStatus.OK);
    }

    @DeleteMapping("/staffs/{id}")
    public ResponseEntity<String> deleteStaffById(@PathVariable Long id) {
        boolean deleted = staffService.deleteStaffById(id);
        if (deleted) {
            return new ResponseEntity<>("Staff deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/staffs/{id}")
    public ResponseEntity<String> updateStaff(@PathVariable Long id, @RequestBody StaffDTO updatedStaffDTO) {
        Staff updatedStaff = StaffMapper.toEntity(updatedStaffDTO);
        boolean updated = staffService.updateStaff(id, updatedStaff);
        if (updated) {
            return new ResponseEntity<>("Staff updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

