package com.solredes.solredes_back.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
@Table(name = "inscripcion")
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "deporte_id", nullable = false)
    private Deporte deporte;

    @Column(nullable = false)
    private LocalDateTime FechaInscripcion;

    @PrePersist
    protected void onCreate() {
        this.FechaInscripcion = LocalDateTime.now();
    }
}
