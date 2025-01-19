package com.devwn.taskmanagement.services.student;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.entities.ActivityConfiguration;
import com.devwn.taskmanagement.entities.DeployActivity;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.entities.UserActivity;
import com.devwn.taskmanagement.enums.ActivityStatus;
import com.devwn.taskmanagement.infra.security.JWToken;
import com.devwn.taskmanagement.repositories.ActivityConfigurationRepository;
import com.devwn.taskmanagement.repositories.DeployActivityRepository;
import com.devwn.taskmanagement.repositories.UserActivityRepository;
import com.devwn.taskmanagement.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final UserRepository userRepository;
    private final UserActivityRepository userActivityRepository;
    private final JWToken jwToken;
    private final DeployActivityRepository deployActivityRepository;

    @Value("${upload.dir}")
    private String UPLOAD_DIR;

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
    public long countActivitiesConfigurations() {
        User user = jwToken.getLoggedInUser();
        if (user != null) {
            return userActivityRepository.countAllByUserId(user.getId());
        }
        return 0;
    }


    @Override
    public List<UserActivityDTO> getUserActitityByUserId() {
        User loggedInUser = jwToken.getLoggedInUser();
        if (loggedInUser != null) {
            List<UserActivity> activities = userActivityRepository.findAllByUserId(loggedInUser.getId());
            return activities.stream()
                    .map(UserActivity::getUserActivityDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public DeployActivityDTO createDeployActivity(Long userActivityId, Long userId, MultipartFile activityDeployed) {
        Optional<UserActivity> userActivity = userActivityRepository.findById(userActivityId);
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent() && userActivity.isPresent()) {

            try {
                String activityDeployedPath = saveFile(activityDeployed);

                UserActivity userActivityU = userActivity.get();
                userActivityU.setActivityStatus(ActivityStatus.COMPLETED);
                userActivityRepository.save(userActivityU);

                DeployActivity deployActivity = new DeployActivity();
                deployActivity.setUserActivity(userActivity.get());
                deployActivity.setUser(user.get());
                deployActivity.setOperationUser(userActivity.get().getOperationUser().getEmail());
                deployActivity.setDeployStatus(String.valueOf(userActivityU.getActivityStatus()));
                deployActivity.setCreatedAt(LocalDateTime.now());
                deployActivity.setDoneAt();
                deployActivity.setActivityDeployed(activityDeployedPath);
                deployActivity.setEditCount(0);
                return deployActivityRepository.save(deployActivity).getDeployActivityDTO();

            } catch (IOException e) {
                throw new RuntimeException("Erro ao salvar arquivos: " + e.getMessage(), e);
            }
        }
        return null;
    }

    @Override
    public List<DeployActivityDTO> getDeployActivityByUserId() {
        User loggedInUser = jwToken.getLoggedInUser();
        if (loggedInUser != null) {
            List<DeployActivity> activities = deployActivityRepository.findAllByUserId(loggedInUser.getId());
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
            return deployActivityRepository.countAllByUserId(loggedInUser.getId());
        }
        return 0;
    }

    @Override
    public DeployActivityDTO updateDeployActivity(Long id, MultipartFile activityDeployed) {
        Optional<DeployActivity> deployActivityOptional = deployActivityRepository.findById(id);
        if(deployActivityOptional.isPresent()) {
            try {
                DeployActivity deployActivity = deployActivityOptional.get();
                if(deployActivity.getEditCount() < 2) {
                    String activityDeployedPath = saveFile(activityDeployed);
                    deployActivity.setActivityDeployed(activityDeployedPath);
                    deployActivity.setUpdatedAt(LocalDateTime.now());
                    deployActivity.setEditCount(deployActivity.getEditCount() + 1);
                    return deployActivityRepository.save(deployActivity).getDeployActivityDTO();
                }
            } catch (IOException e) {
                throw new RuntimeException("Erro ao salvar arquivos: " + e.getMessage(), e);
            }
        }
        return null;
    }
}
