package com.cnjava.book_store.User;

import java.time.LocalDate;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.cnjava.book_store.Staff.Staff;

@Component
public class StaffSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public StaffSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        super();
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createAdministrator();
    }
    
    private void createAdministrator() {
        // Check if an admin user already exists
        boolean adminExists = userRepository.existsByUsername("admin");
        if (adminExists) {
            return; // Do nothing if the admin user already exists
        }
        
        // Create the admin user if it doesn't exist
        Staff user = new Staff();
        user.setFullName("admin");
        user.setBirthDate(LocalDate.parse("1111-01-01"));
        user.setAddress("admin address");
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setPhoneNumber("0987654321");
        user.setRoles(Role.ADMIN);
        userRepository.save(user);
    }
}