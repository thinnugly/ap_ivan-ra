package com.devwn.taskmanagement.dto;


import com.devwn.taskmanagement.enums.UserRole;
import lombok.Data;

@Data
public class SigninResponse {

    private String token;
    private Long userId;
    private String username;
    private String email;;
    private UserRole userRole;
}
