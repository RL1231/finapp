package com.finapp.api.controller;

import com.finapp.api.dto.JwtUser;
import com.finapp.api.entity.User;
import com.finapp.api.repo.AccountRepo;
import com.finapp.api.repo.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ApiController {
    private final UserRepo userRepo;

    public ApiController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/auth")
    @PreAuthorize("hasAuthority('ROLE_client-user')")
    public JwtUser getAuth(JwtAuthenticationToken auth) {
        try {
            if (auth.isAuthenticated()) {
                String email = auth.getToken().getClaim("email");

                if (userRepo.findByEmail(email).isPresent()) {
                    Long id = userRepo.findByEmail(email).get().getId();

                    return new JwtUser(id, email);
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return null;
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_client-user')")
    public User getUser(@PathVariable Long id) {
        return userRepo.findById(id).get();
    }

}
