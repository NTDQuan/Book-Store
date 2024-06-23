package com.cnjava.book_store.Authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cnjava.book_store.Customer.Customer;
import com.cnjava.book_store.Jwt.JwtService;
import com.cnjava.book_store.Staff.Staff;
import com.cnjava.book_store.User.Role;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;

@Service
public class AuthenticationService {
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
		super();
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}
	
	public AuthenticationResponse customerRegister(Customer request) {
		Customer user = new Customer();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setBirthDate(request.getBirthDate());
		user.setAddress(request.getAddress());
		user.setFullName(request.getFullName());
		user.setPhoneNumber(request.getPhoneNumber());
		user.setRoles(Role.CUSTOMER);
		
		user = repository.save(user);
		
		String token = jwtService.gererateToken(user);
		return new AuthenticationResponse(token, user.getRoles().name());
	}
	
	public AuthenticationResponse staffRegister(Staff request) {
		Staff user = new Staff();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setBirthDate(request.getBirthDate());
		user.setAddress(request.getAddress());
		user.setFullName(request.getFullName());
		user.setPhoneNumber(request.getPhoneNumber());
		user.setRoles(Role.STAFF);
		
		user = repository.save(user);
		
		String token = jwtService.gererateToken(user);
		return new AuthenticationResponse(token, user.getRoles().name());
	}
	
	public AuthenticationResponse authenticate(User request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUsername(),
						request.getPassword()
				)
		);
		User user = repository.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtService.gererateToken(user);
		return new AuthenticationResponse(token, user.getRoles().name());
	}
}
