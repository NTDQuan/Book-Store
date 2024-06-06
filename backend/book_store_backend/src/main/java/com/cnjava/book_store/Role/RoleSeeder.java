package com.cnjava.book_store.Role;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.cnjava.book_store.Enum.RoleEnum;

@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {
	private final RoleRepository roleRepository;
	
    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.loadRoles();
    }
    
    private void loadRoles() {
        RoleEnum[] roleNames = new RoleEnum[] { RoleEnum.USER, RoleEnum.STAFF, RoleEnum.ADMIN };

        Arrays.stream(roleNames).forEach((roleName) -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);

            optionalRole.ifPresentOrElse(System.out::println, () -> {
                Role roleToCreate = new Role();

                roleToCreate.setName(roleName);

                roleRepository.save(roleToCreate);
            });
        });
    }
}
