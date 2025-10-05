package com.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utility.Vector;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="Player")
public class Player {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	 
	@OneToOne
	@JoinColumn(name = "ship_id")
	@JsonIgnore
	private Ship ship;
	
	@NotBlank
	@Size(min  = 3, max = 20, message = "The name length must be between 3 and 20")
	@Column(name = "name_")
	private String name;
	
	@OneToOne(mappedBy = "player")
	@JsonIgnore
	private User user;
	
	private double fuel;
	
	@Embedded
	@AttributeOverrides({				// here we can rename columns attributes
        @AttributeOverride(name = "x", column = @Column(name = "x_axis")),
        @AttributeOverride(name = "y", column = @Column(name = "y_axis")),
        @AttributeOverride(name = "z", column = @Column(name = "z_axis"))
    })
	private Vector position;
	/*private int numEquip;
	
	@ManyToMany
	private List<Character> eqip;
	@ManyToMany
	private List<Ship> ships;
	@ManyToMany
	private List<Message> messages;
	*/
	
	public Player() {}
	
	public Player(long id, Ship ship, double fuel, Vector position) {
		super();
		this.id = id;
		this.ship = ship;
		this.fuel = fuel;
		this.position = position;	
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
	
	public void moveTo(Vector destination) {
		this.fuel = -(this.position.distance(destination)) / 100;
		this.position = destination;
	}
}
