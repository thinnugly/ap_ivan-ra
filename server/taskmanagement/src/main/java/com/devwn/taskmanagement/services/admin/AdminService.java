package com.devwn.taskmanagement.services.admin;

import com.devwn.taskmanagement.dto.*;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminService {

    List<UserDTO> getUsers();
    ActivityConfigurationDTO createActivityConfiguration(String technicalDescription,
                                                         MultipartFile activityInstructions,
                                                         MultipartFile supportMaterial);

    long countUsers();
    long countActivitiesConfigurations();
    void deleteActivityConfiguration(Long id);
    ActivityConfigurationDTO updateActivityConfiguration(Long id, String technicalDescription,
                                                         MultipartFile activityInstructions,
                                                         MultipartFile supportMaterial);
    UserActivityDTO createUserActivity(UserActivityDTO userActivityDTO);
    UserActivityDTO updateUserActivity(Long id, UserActivityDTO userActivityDTO);
    void deleteAssignActivity(Long id);
    List<ActivityConfigurationDTO> getActivityConfigurationsByUserId();
    List<UserActivityDTO> getUserActitityByUserId();
    List<DeployActivityDTO> getDeployActivityByUserId();
    long countDeployActivitiesByUserId();
    void deleteDeployActivity(Long id);
    DeployActivityDTO updateDeployActivity (Long id, double nota);
    void cancelLateActivities();
    NotificationDTO createNotification(NotificationDTO notificationDTO);
    void deleteByReadTrue();
    List<NotificationDTO> getUnreadNotifications();
    void markAsRead(Long id);
}
