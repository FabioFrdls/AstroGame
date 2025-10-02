package com.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="User_")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne
	@JoinColumn(name = "player_id")
	@JsonIgnore
	private Player player;
	
	@NotBlank
	@Pattern(regexp = "^[A-Za-z0-9._%+-]+@gmail\\.com$") // this allows to use whichever char in the email
														 // but specifies that it must end with @...
	private String email;
	
	@NotBlank
	@Size(min  = 3, max = 20, message = "The name length must be between 3 and 20")
	@Column(name = "username")
	private String userName;
	
	@NotBlank
	@Size(min  = 8, max = 20, message = "The password length must be between 8 and 20")
	@Column(name = "password_")
	private String password;
	
	public User() {}
	
	public User(long id, String email, String userName, String password) {
		super();
		this.id = id;
		this.email = email;
		this.userName = userName;
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
