package com.devwn.taskmanagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityConfigurationDTO {

    private Long id;
    private String technicalDescription;
    private String activityInstructions;
    private String supportMaterial;
    private Long userId;
    private String userEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
