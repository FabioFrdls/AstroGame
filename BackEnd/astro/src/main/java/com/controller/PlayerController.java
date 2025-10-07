package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dto.PlayerDto;
import com.model.Ship;
import com.service.PlayerService;
import com.utility.Vector;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
	
	@Autowired
	private PlayerService playerService;

	public PlayerController(PlayerService playerService) {
		super();
		this.playerService = playerService;
	}
	
	@PostMapping
	public ResponseEntity<PlayerDto> create(@RequestHeader(name = "token", required = true) String token, @RequestBody PlayerDto data){
		System.out.println("TOKEN ricevuto: " + token);
	    System.out.println("BODY ricevuto: " + data.getName());
	    try {
		Long playerId = playerService.getPlayerIdFromToken(token);
		PlayerDto player = playerService.create(playerId, data.getName(), data.getShip());
		return ResponseEntity.ok(player);}
	    catch(Exception e){e.printStackTrace();
	    return ResponseEntity.badRequest().build();}
	}
	
	@PutMapping("/move")
	public ResponseEntity<PlayerDto> moveTo(@RequestHeader(name = "token", required = true) String token, @RequestBody Vector destination){
		Long playerId = playerService.getPlayerIdFromToken(token);
		PlayerDto player = playerService.moveTo(playerId, destination);
		return ResponseEntity.ok(player);
	}
}
