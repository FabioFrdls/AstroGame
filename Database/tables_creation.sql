USE astro;

CREATE TABLE ship(
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	name_ VARCHAR(50), 
	max_fuel DECIMAL(10,2),
	max_equip INT,
	size INT
);

CREATE TABLE player(
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	ship_id BIGINT,
	name_ VARCHAR(50),
	fuel DECIMAL(10,2),
	x_axis DECIMAL(10,2),
	y_axis DECIMAL(10,2),
	z_axis DECIMAL(10,2),
	FOREIGN KEY(ship_id) REFERENCES ship(id) 
);

CREATE TABLE user_(
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	player_id BIGINT,
	email VARCHAR(50),
	user_name VARCHAR(50),
	password_ VARCHAR(50),
	FOREIGN KEY(player_id) REFERENCES player(id) 
	
);

CREATE TABLE session_(
	id BIGINT not null AUTO_INCREMENT PRIMARY KEY,
	user_id BIGINT,
	token VARCHAR(50),
	FOREIGN KEY(user_id) REFERENCES user_(id) 

);