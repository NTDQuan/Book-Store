package com.cnjava.book_store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cnjava.book_store.Jwt.JwtAuthenticationFilter;
import com.cnjava.book_store.User.UserDetailService;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfiguaration {
	
	private final UserDetailService userDetailService;
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfiguaration(UserDetailService userDetailService, JwtAuthenticationFilter jwtAuthenticationFilter) {
		super();
		this.userDetailService = userDetailService;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(
						req->req.requestMatchers("/auth/**").permitAll()
						.requestMatchers("/public/**").permitAll()
						.requestMatchers("/admin/**").hasAnyRole("ADMIN", "STAFF")
						.anyRequest().authenticated()
				).userDetailsService(userDetailService)
				.sessionManagement(session->session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	
}
