package com.service;

import org.springframework.stereotype.Service;

import com.model.User;
import com.repo.UserRepo;

@Service
public class UserService {
 
	private UserRepo userRepo;

	public UserService(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}
	
	public User register(User user) {
		userRepo.save(user);
		return user;
	}
}
