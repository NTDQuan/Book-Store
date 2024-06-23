package com.cnjava.book_store.User.dto;

public class LoginUserDto {
	private String username;
	private String password;
	
	LoginUserDto() {}

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
	
}
