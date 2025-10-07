package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.model.Ship;
import com.repo.ShipRepo;


@Service
public class ShipService {
	
	private ShipRepo shipRepo;

	public ShipService(ShipRepo shipRepo) {
		super();
		this.shipRepo = shipRepo;
	}
	
	// Get methods
	
	public List<Ship> getAll(){
		return shipRepo.findAll();
	}
	
	public List<Ship> getBySize(int size){
		return shipRepo.findBySize(size);
	}
	
	public List<Ship> getInitials(){			// get the initial 3 ships for starting the game
		List<Ship> list = shipRepo.findBySize(1);
		return list.subList(0, 3);
	}
}
