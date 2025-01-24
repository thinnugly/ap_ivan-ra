package com.devwn.taskmanagement.dto;

import com.devwn.taskmanagement.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {

    private Long id;
    private Long userId;
    private String username;
    private String message;
    private LocalDateTime createdAt;
    private boolean read;
}
