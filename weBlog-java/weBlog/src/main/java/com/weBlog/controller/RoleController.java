package com.weBlog.controller;

import com.weBlog.model.Role;
import com.weBlog.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleRepository roleRepository;

    @GetMapping
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @PostMapping
    public ResponseEntity createRole(@RequestBody Role role) throws Exception {
        Role savedRole = roleRepository.save(role);
        return ResponseEntity.ok(savedRole);
    }

}
