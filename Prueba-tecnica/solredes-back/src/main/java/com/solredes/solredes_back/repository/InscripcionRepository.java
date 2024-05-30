package com.solredes.solredes_back.repository;

import com.solredes.solredes_back.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {

}
