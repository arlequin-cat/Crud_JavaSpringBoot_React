package com.solredes.solredes_back.repository;

import com.solredes.solredes_back.model.Deporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeporteRepository extends JpaRepository<Deporte, Long> {

}
