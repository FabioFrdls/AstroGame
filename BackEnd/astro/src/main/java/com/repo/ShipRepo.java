package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Ship;
@Repository
public interface ShipRepo  extends JpaRepository<Ship, Long>  {
	public List<Ship> findBySize(int size);

}
