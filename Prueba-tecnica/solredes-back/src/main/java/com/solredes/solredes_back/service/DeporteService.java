package com.solredes.solredes_back.service;

import com.solredes.solredes_back.model.Deporte;
import com.solredes.solredes_back.repository.DeporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Service
public class DeporteService {

    private final DeporteRepository deporteRepository;

    @Autowired
    public DeporteService(DeporteRepository deporteRepository) {
        this.deporteRepository = deporteRepository;
    }

    public List<Deporte> listDeportes() {
        return deporteRepository.findAll();
    }

    public Deporte getDeporte(Long id) throws NotFoundException {
        return deporteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());
    }

    public Deporte actualizarDeporte(Long id, Deporte updateDepor) throws NotFoundException {
        Deporte deporte = getDeporte(id);
        deporte.setNombre(updateDepor.getNombre());
        deporte.setDescripcion(updateDepor.getDescripcion());
        return deporteRepository.save(deporte);
    }

    public Deporte crearDeporte(Deporte deporte) {
        return deporteRepository.save(deporte);
    }

    public void eliminarDeporte(Long id) throws NotFoundException {
        if (deporteRepository.existsById(id)) {
            deporteRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }
}
