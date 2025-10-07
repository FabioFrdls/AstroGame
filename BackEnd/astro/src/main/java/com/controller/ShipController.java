package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Ship;
import com.service.ShipService;

@RestController
@RequestMapping("/ship")
@CrossOrigin(origins = "http://localhost:5173")
public class ShipController {

	@Autowired
	private ShipService shipService;

	public ShipController(ShipService shipService) {
		super();
		this.shipService = shipService;
	}
	
	@GetMapping
	public List<Ship> get(@RequestParam Integer size){
		if(size == null)
			return shipService.getAll();
		if(size == 0)
			return shipService.getInitials();
		return shipService.getBySize(size);
	}
}
