package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Player;

@Repository
public interface PlayerRepo  extends JpaRepository<Player, Long> {
}
