package com.cnjava.book_store.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnjava.book_store.Jwt.JwtService;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.dto.LoginUserDto;
import com.cnjava.book_store.User.dto.RegisterCustomerDto;
import com.cnjava.book_store.User.dto.RegisterStaffDto;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
	private final JwtService jwtService;
	private final AuthenticationService authenticationService;
	
    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterCustomerDto registerCustomerDto) {
        User registeredUser = authenticationService.registerCustomer(registerCustomerDto);
        return ResponseEntity.ok(registeredUser);
    }
    
    @PostMapping("/admin/signup")
    public ResponseEntity<User> adminRegister(@RequestBody RegisterStaffDto registerStaffDto) {
    	User registeredUser = authenticationService.registerStaff(registerStaffDto);
    	return ResponseEntity.ok(registeredUser);
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
    
}
