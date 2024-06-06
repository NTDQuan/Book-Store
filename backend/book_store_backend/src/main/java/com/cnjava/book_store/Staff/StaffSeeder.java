package com.cnjava.book_store.Staff;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.cnjava.book_store.Enum.RoleEnum;
import com.cnjava.book_store.Role.Role;
import com.cnjava.book_store.Role.RoleRepository;
import com.cnjava.book_store.User.User;
import com.cnjava.book_store.User.UserRepository;
import com.cnjava.book_store.User.dto.RegisterStaffDto;

@Component
public class StaffSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    public StaffSeeder(
            RoleRepository roleRepository,
            UserRepository  userRepository,
            PasswordEncoder passwordEncoder
        ) {
            this.roleRepository = roleRepository;
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
        }
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createAdministrator();
    }
    
    private void createAdministrator() {
        RegisterStaffDto staffDto = new RegisterStaffDto();
        staffDto.setUsername("Admin");
        staffDto.setPassword("Admin");
        staffDto.setBirthdate(LocalDate.parse("1111-01-01"));
        staffDto.setEmail("admin@gmail.com");
        staffDto.setAddress("None");
        staffDto.setPhoneNumber("0987654321");
        staffDto.setFullName("Admin");

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        Optional<User> optionalUser = userRepository.findByUsername(staffDto.getUsername());

        if (optionalRole.isEmpty() || optionalUser.isPresent()) {
            return;
        }

        Staff user = new Staff();
        user.setUsername(staffDto.getUsername());
        user.setPassword(passwordEncoder.encode(staffDto.getPassword()));
        user.setRoles(Set.of(optionalRole.get()));
        user.setAddress(staffDto.getAddress());
        user.setBirthDate(staffDto.getBirthDate());
        user.setFullName(staffDto.getFullName());
        user.setPhoneNumber(staffDto.getPhoneNumber());
        userRepository.save(user);
    }

}
