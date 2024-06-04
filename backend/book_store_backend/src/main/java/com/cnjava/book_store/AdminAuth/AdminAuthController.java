package com.cnjava.book_store.AdminAuth;

import com.cnjava.book_store.Staff.Staff;
import com.cnjava.book_store.Staff.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/auth")
public class AdminAuthController {

    private final StaffService staffService;

    @Autowired
    public AdminAuthController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminAuthRequest authRequest) {
        Staff staff = staffService.findByUsername(authRequest.getUsername());
        if (staff != null && staff.getPassword().equals(authRequest.getPassword())) {
            // Tạo và trả về token (hoặc đơn giản chỉ là trạng thái đăng nhập thành công)
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
