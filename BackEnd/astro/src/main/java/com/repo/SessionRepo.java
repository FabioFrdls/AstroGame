package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Session;

public interface SessionRepo extends JpaRepository<Session, Long> {
	
	public Session findByToken(String token);

}
