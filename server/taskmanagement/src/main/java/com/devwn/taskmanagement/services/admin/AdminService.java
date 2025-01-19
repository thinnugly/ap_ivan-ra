package com.devwn.taskmanagement.services.admin;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.dto.UserDTO;
import com.devwn.taskmanagement.entities.UserActivity;
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

}
