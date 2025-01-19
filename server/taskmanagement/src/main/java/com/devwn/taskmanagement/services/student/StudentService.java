package com.devwn.taskmanagement.services.student;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    long countActivitiesConfigurations();
    List<UserActivityDTO> getUserActitityByUserId();
    DeployActivityDTO createDeployActivity (Long userActivityId, Long userId, MultipartFile activityDeployed);
    List<DeployActivityDTO> getDeployActivityByUserId();
    long countDeployActivitiesByUserId();
    DeployActivityDTO updateDeployActivity (Long id, MultipartFile activityDeployed);
}
