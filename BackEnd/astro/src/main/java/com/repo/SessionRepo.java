package com.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Session;

public interface SessionRepo extends JpaRepository<Session, Long> {
	
	public Optional<Session> findByToken(String token);

}
