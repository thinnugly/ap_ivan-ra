package com.devwn.taskmanagement.dto;

import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.entities.UserActivity;
import com.devwn.taskmanagement.enums.ActivityStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DeployActivityDTO {

    private Long id;
    private Long userActivityId;
    private String technicalDescription;
    private Date dueDate;
    private Long userId;
    private String username;
    private Long operationUserId;
    private String operationUserEmail;
    private String activityDeployed;
    private String deployStatus;
    private String doneAt;
    private int editCount;
    private double nota;
    private String situation;
    private LocalDateTime avaliatedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
