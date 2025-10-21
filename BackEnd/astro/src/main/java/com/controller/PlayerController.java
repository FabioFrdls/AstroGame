package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dto.PlayerDto;
import com.model.Player;
import com.model.Ship;
import com.model.User;
import com.service.PlayerService;
import com.service.UserService;
import com.utility.Pair;
import com.utility.Vector;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
	
	@Autowired
	private PlayerService playerService;
	private UserService userService;

	public PlayerController(PlayerService playerService, UserService userService) {
		super();
		this.playerService = playerService;
		this.userService = userService;
	}
	
	@PostMapping
	public ResponseEntity<PlayerDto> create(@RequestHeader(name = "token", required = true) String token, @RequestBody PlayerDto data){
		User user = userService.getUserByToken(token);
		PlayerDto player = playerService.create(data.getName(), data.getShip(), user);
		return ResponseEntity.ok(player);
	}
	
	@PutMapping("/move")
	public ResponseEntity<Pair<PlayerDto, Boolean>> moveTo(@RequestHeader(name = "token", required = true) String token, @RequestBody Vector destination){
		System.out.println("Controller: " + destination.toString());
		Long playerId = playerService.getPlayerIdFromToken(token);
		Pair<PlayerDto, Boolean> response =  playerService.moveTo(playerId, destination);
		return ResponseEntity.ok(response);
	}
	
	// Get methods
	
	@GetMapping("/getPlayer")
	public ResponseEntity<PlayerDto> getUserPlayer(@RequestHeader(name = "token") String token) {
	    User user = userService.getUserByToken(token);
	    if (user == null) {
	    	System.out.println("User not found");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	    if(user.getPlayer() == null) {
	    	System.out.println("Player not found");
	    	return ResponseEntity.noContent().build();
	    }
	    	
	    return ResponseEntity.ok(new PlayerDto(user.getPlayer()));
	}
	
	// Delete methods
	
	@DeleteMapping
	public ResponseEntity<PlayerDto> deletePlayer(@RequestHeader(name = "token") String token){
		User user = userService.getUserByToken(token);
	    if (user == null) {
	    	System.out.println("User not found");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	    Player player = user.getPlayer();
	    if(player == null) {
	    	System.out.println("Player not found");
	    	return ResponseEntity.noContent().build();
	    } 
	    return ResponseEntity.ok(playerService.delete(player.getId(), user.getId()));
	}
}
