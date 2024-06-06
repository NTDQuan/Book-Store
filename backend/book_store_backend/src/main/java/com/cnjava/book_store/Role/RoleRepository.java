package com.cnjava.book_store.Role;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cnjava.book_store.Enum.RoleEnum;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long>{
	Optional<Role> findByName(RoleEnum name);
}
