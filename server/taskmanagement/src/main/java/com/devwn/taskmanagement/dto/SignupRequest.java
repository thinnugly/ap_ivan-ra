package com.devwn.taskmanagement.dto;


import com.devwn.taskmanagement.enums.UserRole;
import lombok.Data;

@Data
public class SignupRequest {

    private String email;
    private String password;
    private String username;
    private UserRole userRole;
}
