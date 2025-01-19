package com.devwn.taskmanagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private String message;
    private LocalDateTime timestamp;
}
