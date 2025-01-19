package com.devwn.taskmanagement.services.auth;


import com.devwn.taskmanagement.dto.SignupRequest;
import com.devwn.taskmanagement.dto.UserDTO;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.enums.UserRole;
import com.devwn.taskmanagement.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public void createAdminAccount(){
        Optional<User> adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount.isEmpty()){
            User user = new User();
            user.setUserRole(UserRole.ADMIN);
            user.setUsername("Renato Madeia Muiambo");
            user.setPassword(new BCryptPasswordEncoder().encode("zidelynt"));
            user.setEmail("renatomuiambo@admin.com");
            user.setCreatedAt(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("Admin account created successfully.");
        }else{
            System.out.println("Admin account already exists.");
        }
    }

    @PostConstruct
    public void createDefaultAdminAccount() {
        User user = new User();
        user.setEmail("defaultadmin@admin.com");
        Optional<User> verifyDefaultAdminAccount = userRepository.findFirstByEmail(user.getEmail());
        if (verifyDefaultAdminAccount.isEmpty()) {
            user.setUserRole(UserRole.ADMIN);
            user.setUsername("Default Administrator");
            user.setPassword(new BCryptPasswordEncoder().encode("defaultadmin"));
            user.setCreatedAt(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("Default admin account created successfully.");
        } else {
            System.out.println("Default admin account already exists.");
        }
    }

    @Override
    public boolean hasUserWithEmail(String email) { return userRepository.findFirstByEmail(email).isPresent();}

    @Override
    public UserDTO signup(SignupRequest signupRequest, UserRole roleToAssign) {
        User user = new User();
        user.setUserRole(roleToAssign);
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUsername(signupRequest.getUsername());
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user).getUserTDO();
    }

    @Override
    public UserRole findRoleByUser(String username) {
        Optional<User> user = userRepository.findByEmail(username);
        return user.map(User::getUserRole).orElse(null);
    }

    @Override
    public User getCurrentUser(String username) {
        Optional<User> userOptional = userRepository.findByEmail(username);
        return userOptional.orElse(null);
    }

}
