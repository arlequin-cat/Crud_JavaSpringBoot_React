package com.solredes.solredes_back.controller;

import com.solredes.solredes_back.model.Deporte;
import com.solredes.solredes_back.service.DeporteService;
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
@RequestMapping("/api/v1/deporte")
public class DeporteController {
@Autowired
    private DeporteService deporteService;

    @GetMapping
    public ResponseEntity<List<Deporte>> listDeporte() {
        List<Deporte> deporte = deporteService.listDeportes();
        return new ResponseEntity<>(deporte, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Deporte> getDeporte(@PathVariable Long id) {
        try {
            Deporte deporte = deporteService.getDeporte(id);
            return new ResponseEntity<>(deporte, HttpStatus.OK);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Deporte> actualizarDeporte(@PathVariable Long id, @RequestBody Deporte deporte) {
        try {
            Deporte deporteActualizado = deporteService.actualizarDeporte(id, deporte);
            return new ResponseEntity<>(deporteActualizado, HttpStatus.OK);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<Deporte> crearDeporte(@RequestBody Deporte deporte) {
        Deporte newDeporte = deporteService.crearDeporte(deporte);
        return new ResponseEntity<>(newDeporte, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDeporte(@PathVariable Long id) {
        try {
            deporteService.eliminarDeporte(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ChangeSetPersister.NotFoundException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }    
}
