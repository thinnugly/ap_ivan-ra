package com.devwn.taskmanagement.entities;

import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.enums.ActivityStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "user_activity")
public class UserActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activityconfiguration_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ActivityConfiguration activityConfiguration;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    private Date dueDate;
    private ActivityStatus activityStatus;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "operation_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User operationUser;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    public UserActivityDTO getUserActivityDTO() {
        UserActivityDTO userActivityDTO = new UserActivityDTO();
        userActivityDTO.setId(id);
        userActivityDTO.setActivityConfigurationId(activityConfiguration.getId());
        userActivityDTO.setTechnicalDescription(activityConfiguration.getTechnicalDescription());
        userActivityDTO.setActivityInstructions(activityConfiguration.getActivityInstructions());
        userActivityDTO.setSupportMaterial(activityConfiguration.getSupportMaterial());
        userActivityDTO.setUserId(user.getId());
        userActivityDTO.setUsername(user.getUsername());
        userActivityDTO.setDueDate(dueDate);
        userActivityDTO.setActivityStatus(activityStatus);
        userActivityDTO.setOperationUserId(operationUser.getId());
        userActivityDTO.setOperationUserEmail(operationUser.getEmail());
        userActivityDTO.setCreatedAt(createdAt);
        userActivityDTO.setUpdatedAt(updatedAt);
        return userActivityDTO;
    }
}
