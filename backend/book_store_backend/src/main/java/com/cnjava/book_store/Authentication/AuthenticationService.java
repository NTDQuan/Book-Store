package com.cnjava.book_store.Authentication;

import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cnjava.book_store.Customer.Customer;
import com.cnjava.book_store.Enum.RoleEnum;
import com.cnjava.book_store.Role.Role;
import com.cnjava.book_store.Role.RoleRepository;
import com.cnjava.book_store.Staff.Staff;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;
import com.cnjava.book_store.User.dto.LoginUserDto;
import com.cnjava.book_store.User.dto.RegisterCustomerDto;
import com.cnjava.book_store.User.dto.RegisterStaffDto;

@Service
public class AuthenticationService {
	private final UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final RoleRepository roleRepository;
	
	private final AuthenticationManager authenticationManager;
	
	 private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
	
    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository
        ) {
            this.authenticationManager = authenticationManager;
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.roleRepository = roleRepository;
        }
    
    public User registerCustomer(RegisterCustomerDto input) {
    	Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ROLE_USER);
        if (optionalRole.isEmpty()) {
            return null;
        }
    	
    	logger.info("RegisterCustomerDto: {}", input);
        Customer customer = new Customer();
        customer.setUsername(input.getUsername());
        customer.setPassword(passwordEncoder.encode(input.getPassword()));
        customer.setBirthDate(input.getBirthDate());
        customer.setAddress(input.getAddress());
        customer.setFullName(input.getFullName());
        customer.setPhoneNumber(input.getPhoneNumber());
        customer.setRoles(Set.of(optionalRole.get()));
        return userRepository.save(customer);
    }
    
    public User registerStaff(RegisterStaffDto input) {
    	Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ROLE_STAFF);
        if (optionalRole.isEmpty()) {
            return null;
        }
    	
    	logger.info("RegisterCustomerDto: {}", input);
        Staff staff = new Staff();
        staff.setUsername(input.getUsername());
        staff.setPassword(passwordEncoder.encode(input.getPassword()));
        staff.setBirthDate(input.getBirthDate());
        staff.setAddress(input.getAddress());
        staff.setFullName(input.getFullName());
        staff.setPhoneNumber(input.getPhoneNumber());
        staff.setRoles(Set.of(optionalRole.get()));
        return userRepository.save(staff);
    }
    
    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }
}
