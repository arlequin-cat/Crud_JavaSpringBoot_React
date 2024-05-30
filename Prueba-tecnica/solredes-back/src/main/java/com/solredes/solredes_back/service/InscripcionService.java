package com.solredes.solredes_back.service;

import com.solredes.solredes_back.model.Inscripcion;
import com.solredes.solredes_back.repository.InscripcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;

    @Autowired
    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    public List<Inscripcion> listInscripcion() {
        return inscripcionRepository.findAll();
    }

    public Inscripcion getInscripcion(Long id) throws NotFoundException {
        return inscripcionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());
    }

    public Inscripcion actualizarInscripcion(Long id, Inscripcion updateInscri) throws NotFoundException {
        Inscripcion inscripcion = getInscripcion(id);
        inscripcion.setUsuario(updateInscri.getUsuario());
        inscripcion.setDeporte(updateInscri.getDeporte());
        return inscripcionRepository.save(inscripcion);
    }

    public Inscripcion crearInscripcion(Inscripcion inscripcion) throws Exception {
        return inscripcionRepository.save(inscripcion);
    }

    public void eliminarInscripcion(Long id) throws NotFoundException {
        if (inscripcionRepository.existsById(id)) {
            inscripcionRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }
}
