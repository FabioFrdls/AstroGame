package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
