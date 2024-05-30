package com.solredes.solredes_back.service;

import com.solredes.solredes_back.model.Usuario;
import com.solredes.solredes_back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuario(Long id) throws NotFoundException {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());
    }

    public Usuario actualizarUsuario(Long id, Usuario updateUser) throws NotFoundException {
        Usuario usuario = getUsuario(id);
        usuario.setNombre(updateUser.getNombre());
        usuario.setEmail(updateUser.getEmail());
        return usuarioRepository.save(usuario);
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) throws NotFoundException {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }
}
