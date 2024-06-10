package com.cnjava.book_store.Authentication;

import java.util.Set;
import java.util.stream.Collectors;

import com.cnjava.book_store.Role.Role;

public class LoginResponse {
	private String token;
	
	private long expiresIn;
	
	private Set<String> role;
	
	private long id;
	
    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
    
    public Set<String> getRole() {
    	return role;
    }
    
    public LoginResponse setRole(Set<Role> roles) {
    	this.role = roles.stream().map(role -> role.getName().toString()).collect(Collectors.toSet());
    	return this;
    }
    
    public long getId() {
        return id;
    }

    public LoginResponse setId(long id) {
        this.id = id;
        return this;
    }

	@Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiresIn=" + expiresIn +
                '}';
    }
    
    
}
