package com.devwn.taskmanagement.dto;

import com.devwn.taskmanagement.enums.ActivityStatus;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserActivityDTO {

    private Long id;
    private Long activityConfigurationId;
    private String technicalDescription;
    private String activityInstructions;
    private String supportMaterial;
    private Long userId;
    private String username;
    private Date dueDate;
    private Long operationUserId;
    private String operationUserEmail;
    private ActivityStatus activityStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
