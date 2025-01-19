package com.devwn.taskmanagement.services.auth;

import com.devwn.taskmanagement.dto.SignupRequest;
import com.devwn.taskmanagement.dto.UserDTO;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.enums.UserRole;


public interface AuthService {

    boolean hasUserWithEmail(String email);
    UserDTO signup(SignupRequest signupRequest, UserRole userRole);
    UserRole findRoleByUser(String username);
    User getCurrentUser(String username);



}
