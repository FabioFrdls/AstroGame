package com.service;

import org.springframework.stereotype.Service;

import com.model.Session;
import com.model.Ship;
import com.model.User;
import com.dto.PlayerDto;
import com.model.Player;
import com.repo.PlayerRepo;
import com.repo.SessionRepo;
import com.repo.ShipRepo;
import com.repo.UserRepo;
import com.utility.Vector;

@Service
public class PlayerService {

	private PlayerRepo playerRepo;
	private SessionRepo sessionRepo;
	private ShipRepo shipRepo;		// for now useless
	private UserRepo userRepo;
	
	public PlayerService(PlayerRepo playerRepo, SessionRepo sessionRepo, ShipRepo shipRepo, UserRepo userRepo) {
		super();
		this.playerRepo = playerRepo;
		this.sessionRepo = sessionRepo;
		this.shipRepo = shipRepo;
		this.userRepo = userRepo;
	}

	// helper methods
	public Long getPlayerIdFromToken(String token) { // takes the actual userId from the client
		Session session = sessionRepo.findByToken(token).orElseThrow(
				() -> new RuntimeException("Token not valid"));
		return session.getUserId();
	}
	
	// Post methods
	public PlayerDto create(Long id, String name, Ship ship) {
		User user = userRepo.findById(id).get();
		Player player = new Player(ship, user, name);
		playerRepo.save(player);
		return new PlayerDto(player);
	}

	// Get methods
	public Player getPlayer(Long id) {
		return playerRepo.findById(id).get();
	}
	
	
	// Put methods
	public void UpdatePlayer(Player player) {
		playerRepo.save(player);
	}
	
	public PlayerDto moveTo(Long id, Vector destination) {
		Player player = playerRepo.findById(id).get();
		player.moveTo(destination);
		playerRepo.save(player);
		return new PlayerDto(player.getFuel(), player.getPosition());
	}
}
