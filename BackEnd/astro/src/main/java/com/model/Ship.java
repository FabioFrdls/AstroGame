package com.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Ship")
public class Ship {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name_")
	private String name;
	private double maxFuel;
	private int maxEquip;
	private int size;
	
	@OneToOne(mappedBy = "ship")
	@JsonIgnore
	private Player player;
	
	public Ship() {}
	
	public Ship(long id, String name, double maxFuel, int maxEquip, int size) {
		super();
		this.id = id;
		this.name = name;
		this.maxFuel = maxFuel;
		this.maxEquip = maxEquip;
		this.size = size;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMaxFuel() {
		return maxFuel;
	}

	public void setMaxFuel(double maxFuel) {
		this.maxFuel = maxFuel;
	}

	public int getMaxEquip() {
		return maxEquip;
	}

	public void setMaxEquip(int maxEquip) {
		this.maxEquip = maxEquip;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
	
}
