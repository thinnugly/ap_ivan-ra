package com.devwn.taskmanagement.entities;

import com.devwn.taskmanagement.dto.NotificationDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    private String message;
    private LocalDateTime createdAt;
    private boolean read = false;

    public NotificationDTO getNotificationDTO() {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(id);
        notificationDTO.setUserId(user.getId());
        notificationDTO.setUsername(user.getUsername());
        notificationDTO.setRead(read);
        notificationDTO.setMessage(message);
        notificationDTO.setCreatedAt(createdAt);
        return notificationDTO;
    }
}
