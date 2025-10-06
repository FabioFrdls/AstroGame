package com.service;

import com.model.Session;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dto.UserDto;
import com.exceptions.LoginException;
import com.exceptions.SessionNotFoundException;
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

	// Post methods

	public User signUp(User user) { // mind that here we don't have an id
		User savedUser = userRepo.save(user);
		return savedUser; // here we have the id
	}

	public Map<String, String> logIn(UserDto userDto) { // could use a password encoder for best practice
		User user = userRepo.findByUserNameAndPassword( // checks if a record exists with the username and password from
														// the DTO
				userDto.getUserName(), userDto.getPassword()).orElseThrow(() -> new LoginException());
		// token generation
		String token = UUID.randomUUID().toString();
		// creates a new valid session and saves it to the database
		Session session = new Session(user.getId(), token);
		sessionRepo.save(session);
		Map<String, String> response = new HashMap<String, String>();
		response.put("token", token);
		response.put("userName", user.getUserName());
		return response;
	}

	public void logout(String token) {
		// checks if a valid session exists with the given token
		Session session = sessionRepo.findByToken(token).orElseThrow(() -> new SessionNotFoundException());
		// deletes the record if exists
		sessionRepo.delete(session);
	}

	// Get methods
	
	public User getUserByToken(String token) {
		Session session = sessionRepo.findByToken(token).orElse(null);
		if (session == null) {
			return null;
		}
		return userRepo.findById(session.getUserId()).orElse(null);
	}

}
