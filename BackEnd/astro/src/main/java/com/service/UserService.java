package com.service;

import com.model.Session;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dto.UserDto;
import com.model.User;
import com.repo.SessionRepo;
import com.repo.UserRepo;

@Service
public class UserService {

	private UserRepo userRepo;
	private SessionRepo sessionRepo;

	public UserService(UserRepo userRepo, SessionRepo sessionRepo) {
		super();
		this.userRepo = userRepo;
		this.sessionRepo = sessionRepo;
		// resets all sessions when the server is started
		sessionRepo.deleteAll();
	}

	public User signUp(User user) { // mind that here we don't have an id
		User savedUser = userRepo.save(user);
		return savedUser; // here we have the id
	}

	public Map<String, String> logIn(UserDto userDto) {
		User user = userRepo.findByUserNameAndPassword( // checks if a record exists with the username and password from
														// the DTO
				userDto.getUsername(), userDto.getPassword());
		Map<String, String> response = new HashMap<String, String>();
		if (user == null)
			return response;
		// token generation
		String token = UUID.randomUUID().toString();
		// creates a new valid session and saves it to the database
		Session session = new Session(user.getId(), token);
		sessionRepo.save(session);
		response.put("token", token);
		response.put("userName", user.getUserName());
		return response;
	}
	
public String logout(String token) {
		
		// checks if a valid session exists with the given tokem
		Session session = sessionRepo.findByToken(token);
		if(session == null)
			return "ERROR: session not found";
		// deletes the record if exists
		sessionRepo.delete(session);
		
		return "LOGOUT_SUCCESS";
	}
}
