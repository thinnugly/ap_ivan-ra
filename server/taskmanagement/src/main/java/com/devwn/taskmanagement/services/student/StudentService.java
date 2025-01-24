package com.devwn.taskmanagement.services.student;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.NotificationDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.entities.Notification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    long countActivitiesConfigurations();
    List<UserActivityDTO> getUserActitityByUserId();
    DeployActivityDTO createDeployActivity (Long userActivityId, Long userId, MultipartFile activityDeployed);
    List<DeployActivityDTO> getDeployActivityByUserId();
    long countDeployActivitiesByUserId();
    DeployActivityDTO updateDeployActivity (Long id, MultipartFile activityDeployed);
    List<NotificationDTO> getUnreadNotifications();
    void markAsRead(Long id);
    NotificationDTO createNotification(NotificationDTO notificationDTO);
}
