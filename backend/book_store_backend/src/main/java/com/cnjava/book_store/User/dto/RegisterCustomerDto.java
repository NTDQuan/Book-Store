package com.cnjava.book_store.User.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public class RegisterCustomerDto {
	
    @NotBlank(message = "Username is mandatory")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
	private String username;
    
    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must be at least 6 characters long")
	private String password;
    
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 1, max = 50, message = "First name must be between 1 and 50 characters")
	private String fullName;
    
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
	private String email; 
	
    @NotBlank(message = "Phone number is mandatory")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 characters")
    private String phoneNumber;
    
    @Past(message = "Birthdate must be a past date")
    private LocalDate birthDate;
    
    @NotBlank(message = "Address is mandatory")
    @Size(min = 5, max = 100, message = "Address must be between 5 and 100 characters")
    private String address;

    public RegisterCustomerDto() {}
    
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthDate = birthdate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
    
    
}
