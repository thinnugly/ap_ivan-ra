package com.devwn.taskmanagement.entities;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "activities")
public class ActivityConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String technicalDescription;
    private String activityInstructions;
    private String supportMaterial;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    public ActivityConfigurationDTO getActivityConfigurationDTO() {
        ActivityConfigurationDTO activityConfigurationDTO = new ActivityConfigurationDTO();
        activityConfigurationDTO.setId(id);
        activityConfigurationDTO.setTechnicalDescription(technicalDescription);
        activityConfigurationDTO.setActivityInstructions(activityInstructions);
        activityConfigurationDTO.setSupportMaterial(supportMaterial);
        activityConfigurationDTO.setUserId(user.getId());
        activityConfigurationDTO.setUserEmail(user.getEmail());
        activityConfigurationDTO.setCreatedAt(createdAt);
        activityConfigurationDTO.setUpdatedAt(updatedAt);
        return activityConfigurationDTO;

    }
}
