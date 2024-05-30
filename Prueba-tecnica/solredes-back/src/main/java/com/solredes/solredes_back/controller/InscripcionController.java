package com.solredes.solredes_back.controller;

import com.solredes.solredes_back.model.Inscripcion;
import com.solredes.solredes_back.service.InscripcionService;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/inscripcion")
public class InscripcionController {

    @Autowired
    private InscripcionService inscripcionService;

    @GetMapping
    public ResponseEntity<List<Inscripcion>> listInscripcion() {
        List<Inscripcion> usuarios = inscripcionService.listInscripcion();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscripcion> getInscripcion(@PathVariable Long id) {
        try {
            Inscripcion inscripcion = inscripcionService.getInscripcion(id);
            return new ResponseEntity<>(inscripcion, HttpStatus.OK);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscripcion> actualizarInscripcion(@PathVariable Long id, @RequestBody Inscripcion inscripcion) {
        try {
            Inscripcion inscripcionActualizado = inscripcionService.actualizarInscripcion(id, inscripcion);
            return new ResponseEntity<>(inscripcionActualizado, HttpStatus.OK);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<Inscripcion> crearInscripcion(@RequestBody Inscripcion inscripcion) {
        try {
            Inscripcion newInscripcion = inscripcionService.crearInscripcion(inscripcion);
            return new ResponseEntity<>(newInscripcion, HttpStatus.OK);
        } catch (Exception ex) {
            Logger.getLogger(InscripcionController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInscripcion(@PathVariable Long id) {
        try {
            inscripcionService.eliminarInscripcion(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
