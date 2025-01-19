package com.devwn.taskmanagement.infra.security;

import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.lang.NonNull;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final JWToken jwToken;

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null) {
            var getEmail = jwToken.validateToken(token);
            System.out.println("Email extraído do token: " + getEmail);
            Optional<User> user = userRepository.findFirstByEmail(getEmail);
            if (user.isPresent()) {
                var authentication = new UsernamePasswordAuthenticationToken(user.get(), null, user.get().getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Usuário encontrado: " + user.get().getEmail());
            }else {
                System.out.println("Usuário não encontrado para o email: " + getEmail);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) return null;
        String token = header.replace("Bearer ", "");
        System.out.println("Token processado: " + token);
        return token;
    }
}
