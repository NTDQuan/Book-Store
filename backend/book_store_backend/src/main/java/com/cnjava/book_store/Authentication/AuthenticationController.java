package com.cnjava.book_store.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnjava.book_store.Customer.Customer;
import com.cnjava.book_store.Staff.Staff;
import com.cnjava.book_store.User.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthenticationController {
	private final AuthenticationService authService;

	public AuthenticationController(AuthenticationService authService) {
		super();
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer request) {
		return ResponseEntity.ok(authService.customerRegister(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
		return ResponseEntity.ok(authService.authenticate(request));
	}
	
	@PostMapping("/admin/staff-register")
	public ResponseEntity<AuthenticationResponse> staffRegister(@RequestBody Staff request) {
		return ResponseEntity.ok(authService.staffRegister(request));
	}
}
