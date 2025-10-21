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
import com.utility.Pair;
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
		User user = userRepo.findById(session.getUserId()).get();	// player must be not null
		return user.getPlayer().getId();
	}
	
	// Post methods
	public PlayerDto create(String name, Ship ship, User user) {
		Player player = new Player(ship, user, name);
		player.setUser(user);
		user.setPlayer(player);
		userRepo.save(user);
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
	
	public Pair<PlayerDto, Boolean> moveTo(Long id, Vector destination) {
		Player player = playerRepo.findById(id).get();
		System.out.println("Service: " + destination.toString());
		boolean move = player.moveTo(destination);
		System.out.println(player.getFuel() + " " + player.getPosition().toString());
		if(move)
			playerRepo.save(player);
		return new Pair<>(new PlayerDto(player), move);
	}
	
	// delete methods
	
	public PlayerDto delete(Long playerId, Long userId) {
		Player player = playerRepo.findById(playerId).get();
		User user = userRepo.findById(userId).get();
		user.setPlayer(null);
		playerRepo.delete(player);
		return new PlayerDto(player);
	}
}
