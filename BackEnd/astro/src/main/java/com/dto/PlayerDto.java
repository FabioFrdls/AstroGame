package com.dto;

import com.model.Player;
import com.model.Ship;
import com.model.User;
import com.utility.Vector;

public class PlayerDto {

	private long id;
	private Ship ship;
	private String name;
	private double fuel;
	private Vector position;
	
	public PlayerDto() {}
	
	public PlayerDto(double fuel, Vector position) {
		this.fuel = fuel;
		this.position = position;
	}

	public PlayerDto(Player player) {
		super();
		this.id = player.getId();
		this.ship = player.getShip();
		this.name = player.getName();
		this.fuel = player.getFuel();
		this.position = player.getPosition();
	}
	
	public PlayerDto(String name, Ship ship) {
		this.name = name;
		this.ship = ship;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Ship getShip() {
		return ship;
	}

	public void setShip(Ship ship) {
		this.ship = ship;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public double getFuel() {
		return fuel;
	}

	public void setFuel(double fuel) {
		this.fuel = fuel;
	}

	public Vector getPosition() {
		return position;
	}

	public void setPosition(Vector position) {
		this.position = position;
	}
	
	
}
