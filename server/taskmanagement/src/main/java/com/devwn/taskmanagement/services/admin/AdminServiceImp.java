package com.devwn.taskmanagement.services.admin;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.dto.UserDTO;
import com.devwn.taskmanagement.entities.ActivityConfiguration;
import com.devwn.taskmanagement.entities.DeployActivity;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.entities.UserActivity;
import com.devwn.taskmanagement.enums.ActivityStatus;
import com.devwn.taskmanagement.enums.UserRole;
import com.devwn.taskmanagement.infra.security.JWToken;
import com.devwn.taskmanagement.repositories.ActivityConfigurationRepository;
import com.devwn.taskmanagement.repositories.DeployActivityRepository;
import com.devwn.taskmanagement.repositories.UserActivityRepository;
import com.devwn.taskmanagement.repositories.UserRepository;
import com.devwn.taskmanagement.services.notification.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;

@Service
@RequiredArgsConstructor
public class AdminServiceImp implements AdminService {

    private final UserRepository userRepository;
    private final ActivityConfigurationRepository activityConfigurationRepository;
    private final UserActivityRepository userActivityRepository;
    private final JWToken jwToken;
    private final DeployActivityRepository deployActivityRepository;
    private final NotificationService notificationService;

    private String getLoggedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @Value("${upload.dir}")
    private String UPLOAD_DIR;

    @Override
    public List<UserDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
                .map(User::getUserTDO)
                .collect(Collectors.toList());
    }

    @Override
    public ActivityConfigurationDTO createActivityConfiguration(String technicalDescription,
                                                                MultipartFile activityInstructions,
                                                                MultipartFile supportMaterial) {

        try {
            String activityInstructionsPath = saveFile(activityInstructions);
            String supportMaterialPath = saveFile(supportMaterial);

            String  loggedUserEmail = getLoggedUserEmail();
            Optional<User> loggedUser = userRepository.findByEmail(loggedUserEmail);
            if(loggedUser.isPresent()) {
                ActivityConfiguration activityConfiguration = new ActivityConfiguration();
                activityConfiguration.setTechnicalDescription(technicalDescription);
                activityConfiguration.setActivityInstructions(activityInstructionsPath);
                activityConfiguration.setSupportMaterial(supportMaterialPath);
                activityConfiguration.setUser(loggedUser.get());
                activityConfiguration.setCreatedAt(LocalDateTime.now());

                activityConfiguration = activityConfigurationRepository.save(activityConfiguration);

                return activityConfiguration.getActivityConfigurationDTO();
            }
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivos: " + e.getMessage(), e);
        }
        return null;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Arquivo vazio");
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.write(path, file.getBytes());

        return "/uploads/" + fileName;
    }

    @Override
    public long countUsers() {
        return userRepository.count();
    }

    @Override
    public void deleteActivityConfiguration(Long id) {

        activityConfigurationRepository.deleteById(id);
    }

    @Override
    public ActivityConfigurationDTO updateActivityConfiguration(Long id, String technicalDescription, MultipartFile activityInstructions, MultipartFile supportMaterial) {
        Optional<ActivityConfiguration> activityConfigurationOptional = activityConfigurationRepository.findById(id);
        if(activityConfigurationOptional.isPresent()) {
            try {
                String activityInstructionsPath = saveFile(activityInstructions);
                String supportMaterialPath = saveFile(supportMaterial);

                String  loggedUserEmail = getLoggedUserEmail();
                Optional<User> loggedUser = userRepository.findByEmail(loggedUserEmail);
                if(loggedUser.isPresent()) {

                    ActivityConfiguration activityConfiguration = activityConfigurationOptional.get();
                    activityConfiguration.setTechnicalDescription(technicalDescription);
                    activityConfiguration.setActivityInstructions(activityInstructionsPath);
                    activityConfiguration.setSupportMaterial(supportMaterialPath);
                    activityConfiguration.setUser(loggedUser.get());
                    activityConfiguration.setUpdatedAt(LocalDateTime.now());

                    activityConfiguration = activityConfigurationRepository.save(activityConfiguration);

                    return activityConfiguration.getActivityConfigurationDTO();
                }

            } catch (IOException e) {
                throw new RuntimeException("Erro ao salvar arquivos: " + e.getMessage(), e);
            }

        }
        return null;
    }

    @Override
    public UserActivityDTO createUserActivity(UserActivityDTO userActivityDTO) {
        Optional<User> user = userRepository.findById(userActivityDTO.getUserId());
        Optional<ActivityConfiguration> activityConfigurationOptional =
                activityConfigurationRepository.findById(userActivityDTO.getActivityConfigurationId());
        if(user.isPresent() && activityConfigurationOptional.isPresent()) {

            String  loggedUserEmail = getLoggedUserEmail();
            Optional<User> loggedUser = userRepository.findByEmail(loggedUserEmail);
            if(loggedUser.isPresent()) {
                UserActivity userActivity = new UserActivity();
                userActivity.setActivityConfiguration(activityConfigurationOptional.get());
                userActivity.setUser(user.get());
                userActivity.setDueDate(userActivityDTO.getDueDate());
                userActivity.setActivityStatus(ActivityStatus.INPROGRESS);
                userActivity.setOperationUser(loggedUser.get());
                userActivity.setCreatedAt(LocalDateTime.now());

                UserActivityDTO dto = userActivityRepository.save(userActivity).getUserActivityDTO();
                notificationService.sendNotificationToUser(user.get(), "A new activity was attached to you!");
                return dto;


            }
        }
        return null;
    }

    @Override
    public UserActivityDTO updateUserActivity(Long id, UserActivityDTO userActivityDTO) {
        Optional<UserActivity> userActivityOptional = userActivityRepository.findById(id);
        if(userActivityOptional.isPresent()) {
            Optional<User> user = userRepository.findById(userActivityDTO.getUserId());
            Optional<ActivityConfiguration> activityConfigurationOptional =
                    activityConfigurationRepository.findById(userActivityDTO.getActivityConfigurationId());
            if(user.isPresent() && activityConfigurationOptional.isPresent()) {
                Date dueDate = userActivityDTO.getDueDate();
                LocalDateTime dueDateTime = dueDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                String  loggedUserEmail = getLoggedUserEmail();
                Optional<User> loggedUser = userRepository.findByEmail(loggedUserEmail);
                if(loggedUser.isPresent()) {
                    UserActivity userActivity = userActivityOptional.get();
                    userActivity.setActivityConfiguration(activityConfigurationOptional.get());
                    userActivity.setUser(user.get());
                    userActivity.setDueDate(userActivityDTO.getDueDate());
                    if (dueDateTime.isBefore(LocalDateTime.now())) {
                        userActivity.setActivityStatus(ActivityStatus.CANCELED);
                    } else {
                        userActivity.setActivityStatus(ActivityStatus.INPROGRESS);
                    }
//                    userActivity.setActivityStatus(ActivityStatus.INPROGRESS);
                    userActivity.setOperationUser(loggedUser.get());
                    userActivity.setUpdatedAt(LocalDateTime.now());
                    UserActivityDTO dto = userActivityRepository.save(userActivity).getUserActivityDTO();
                    notificationService.sendNotificationToUser(user.get(), "The activity attached to you was updated!");
                    return dto;
                }
            }
        }
        return null;
    }

    @Override
    public void deleteAssignActivity(Long id) {
        userActivityRepository.deleteById(id);
    }

    @Override
    public List<ActivityConfigurationDTO> getActivityConfigurationsByUserId() {
        User user = jwToken.getLoggedInUser();
        if (user != null) {
            return activityConfigurationRepository.findAllByUserId(user.getId())
                    .stream()
                    .sorted(Comparator.comparing(ActivityConfiguration::getCreatedAt).reversed())
                    .map(ActivityConfiguration::getActivityConfigurationDTO)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<UserActivityDTO> getUserActitityByUserId() {
        User loggedInUser = jwToken.getLoggedInUser();
        if (loggedInUser != null) {
            List<UserActivity> activities = userActivityRepository.findByOperationUser(loggedInUser);
            return activities.stream()
                    .map(UserActivity::getUserActivityDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public List<DeployActivityDTO> getDeployActivityByUserId() {
        User loggedInUser = jwToken.getLoggedInUser();
        if (loggedInUser != null) {
            List<DeployActivity> activities = deployActivityRepository.findByOperationUser(loggedInUser.getEmail());
            return activities.stream()
                    .map(DeployActivity::getDeployActivityDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public long countDeployActivitiesByUserId() {
        User loggedInUser = jwToken.getLoggedInUser();
        if (loggedInUser != null) {
            return deployActivityRepository.countByOperationUser(loggedInUser.getEmail());
        }
        return 0;
    }

    @Override
    public void deleteDeployActivity(Long id) {
        Optional<DeployActivity> deployActivity = deployActivityRepository.findById(id);
        if(deployActivity.isPresent()) {
            Optional<UserActivity> userActivityOptional = userActivityRepository.findById(deployActivity.get().getUserActivity().getId());
            if(userActivityOptional.isPresent()) {
                UserActivity userActivity = userActivityOptional.get();
                userActivity.setActivityStatus(ActivityStatus.INPROGRESS);
                userActivityRepository.save(userActivity);
            }
            deployActivityRepository.delete(deployActivity.get());
        }
    }

    @Override
    public DeployActivityDTO updateDeployActivity(Long id, double nota) {
        Optional<DeployActivity> deployActivityOptional = deployActivityRepository.findById(id);
        if(deployActivityOptional.isPresent()) {

            DeployActivity deployActivity = deployActivityOptional.get();
            deployActivity.setNota(nota);
            deployActivity.setSituation();
            deployActivity.setAvaliatedAt(LocalDateTime.now());
            deployActivity.setUpdatedAt(LocalDateTime.now());
            return deployActivityRepository.save(deployActivity).getDeployActivityDTO();
        }
        return null;
    }

    @Override
    @Transactional
    public void cancelLateActivities() {
        Date now = new Date();
        List<UserActivity> lateActivities = userActivityRepository.findByActivityStatusAndDueDateBefore(ActivityStatus.INPROGRESS, now);

        for(UserActivity userActivity : lateActivities) {
            userActivity.setActivityStatus(ActivityStatus.CANCELED);
        }

        userActivityRepository.saveAll(lateActivities);
    }

    @Override
    public long countActivitiesConfigurations() {
        User user = jwToken.getLoggedInUser();
        if (user != null) {
            return activityConfigurationRepository.countAllByUserId(user.getId());
        }
        return 0;
    }

}

