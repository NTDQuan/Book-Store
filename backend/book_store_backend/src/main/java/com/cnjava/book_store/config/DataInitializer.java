package com.cnjava.book_store.config;

import com.cnjava.book_store.Staff.Staff;
import com.cnjava.book_store.Staff.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StaffRepository staffRepository;

    @Autowired
    public DataInitializer(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (staffRepository.findByUsername("admin") == null) {
            Staff admin = new Staff();
            admin.setFullName("Admin");
            admin.setBirthDate(LocalDate.of(1980, 1, 1));
            admin.setPhoneNumber("1234567890");
            admin.setAddress("Admin Address");
            admin.setUsername("admin");
            admin.setPassword("password"); // Không mã hóa mật khẩu
            staffRepository.save(admin);
        }
    }
}
