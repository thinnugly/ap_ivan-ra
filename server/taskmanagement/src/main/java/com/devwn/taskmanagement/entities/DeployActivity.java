package com.devwn.taskmanagement.entities;

import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Date;

@Entity
@Table(name = "deploy_activity")
@Data
public class DeployActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assignedactivity_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserActivity userActivity;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    private String operationUser;
    private String activityDeployed;
    private String deployStatus;
    @Column(length = 255)
    private String doneAt;
    @Column(columnDefinition = "int default 0")
    private int editCount;
    @Column(columnDefinition = "double default 0.0")
    private double nota;
    @Column(insertable = false)
    private String situation;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime avaliatedAt;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    public void setDoneAt() {
        Date dueDate = userActivity.getDueDate();
        LocalDateTime dueDateTime = dueDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

        long diff = ChronoUnit.DAYS.between(dueDateTime, createdAt);
        if (diff > 0) {
            this.doneAt = "Activity submitted " + diff + " days after.";
        } else if (diff < 0) {
            this.doneAt = "Activity submitted " + Math.abs(diff) + " days before.";
        } else {
            this.doneAt = "Activity submitted at the same date.";
        }
    }

    public void setSituation() {
        if (nota < 10) {
            this.situation = "Mau";
        } else if (nota >= 10 && nota <= 16) {
            this.situation = "Bom";
        } else if (nota >= 16 && nota <= 20) {
            this.situation = "Muito bom";
        }
    }

    public DeployActivityDTO getDeployActivityDTO(){
        DeployActivityDTO deployActivityDTO = new DeployActivityDTO();
        deployActivityDTO.setId(id);
        deployActivityDTO.setUserActivityId(userActivity.getId());
        deployActivityDTO.setTechnicalDescription(userActivity.getActivityConfiguration().getTechnicalDescription());
        deployActivityDTO.setDueDate(userActivity.getDueDate());
        deployActivityDTO.setUserId(user.getId());
        deployActivityDTO.setUsername(user.getUsername());
        deployActivityDTO.setOperationUserId(userActivity.getOperationUser().getId());
        deployActivityDTO.setOperationUserEmail(userActivity.getOperationUser().getEmail());
        deployActivityDTO.setActivityDeployed(activityDeployed);
        deployActivityDTO.setDeployStatus(deployStatus);
        deployActivityDTO.setDoneAt(doneAt);
        deployActivityDTO.setEditCount(editCount);
        deployActivityDTO.setNota(nota);
        deployActivityDTO.setSituation(situation);
        deployActivityDTO.setAvaliatedAt(avaliatedAt);
        deployActivityDTO.setCreatedAt(createdAt);
        deployActivityDTO.setUpdatedAt(updatedAt);
        return deployActivityDTO;
    }
}
