package com.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
	public Optional<User> findByUserNameAndPassword(String username, String password);
}
