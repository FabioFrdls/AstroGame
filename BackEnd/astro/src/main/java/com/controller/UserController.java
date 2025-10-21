package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.UserDto;
import com.model.User;
import com.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	// Post methods
	
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
	public ResponseEntity<Void> logout(@RequestHeader(name = "token", required = true) String token) {
		userService.logout(token);
		return ResponseEntity.ok().build();
	}
	
	
	// Get methods
	
	@GetMapping("/getCurrentToken")
	public ResponseEntity<UserDto> token(@RequestHeader(name = "token") String token) {
	    User user = userService.getUserByToken(token);
	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	    return ResponseEntity.ok(new UserDto(user.getUserName()));
	}
	
		
}
