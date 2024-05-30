package com.solredes.solredes_back.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table( name = "deportes" )
public class Deporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false )
    private String nombre;
    
    private String descripcion;
}
