package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.UserDto;
import com.model.User;
import com.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	
	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody User user) {
		User response = userService.signUp(user);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> logIn(@RequestBody UserDto user) {
		Map<String, String> response = userService.logIn(user);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader(name = "access-token", required = true) String token) {
		String response = userService.logout(token);
		return ResponseEntity.ok(response);
	}
}
