package com.devwn.taskmanagement.controllers.admin;

import com.devwn.taskmanagement.dto.ActivityConfigurationDTO;
import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.NotificationDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.entities.Notification;
import com.devwn.taskmanagement.entities.UserActivity;
import com.devwn.taskmanagement.repositories.UserRepository;
import com.devwn.taskmanagement.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(adminService.getUsers());
    }

    @PostMapping("/configuracao")
    public ResponseEntity<ActivityConfigurationDTO> createActivityConfiguration(
            @RequestParam("technicalDescription") String technicalDescription,
            @RequestParam("activityInstructions") MultipartFile activityInstructions,
            @RequestParam("supportMaterial") MultipartFile supportMaterial) {

        ActivityConfigurationDTO savedDTO = adminService.createActivityConfiguration(
                technicalDescription, activityInstructions, supportMaterial);

        return new ResponseEntity<>(savedDTO, HttpStatus.CREATED);
    }

    @GetMapping("/countusers")
    public long count() {
        return  adminService.countUsers();
    }

    @GetMapping("/countactivitiesconfigurations")
    public long countActivitiesConfigurations() {
        return adminService.countActivitiesConfigurations();
    }

    @DeleteMapping("/configuracao/{id}")
    public ResponseEntity<Void> deleteActivityConfiguration(@PathVariable Long id) {
        adminService.deleteActivityConfiguration(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/configuracao/{id}")
    public ResponseEntity<?> updateActivityConfiguration(@PathVariable Long id,
            @RequestParam("technicalDescription") String technicalDescription,
            @RequestParam("activityInstructions") MultipartFile activityInstructions,
            @RequestParam("supportMaterial") MultipartFile supportMaterial) {

        ActivityConfigurationDTO savedDTO = adminService.updateActivityConfiguration(id,
                technicalDescription, activityInstructions, supportMaterial);

        return new ResponseEntity<>(savedDTO, HttpStatus.CREATED);
    }

    @PostMapping("/assignactivity")
    public ResponseEntity<UserActivityDTO> createUserActivity(@RequestBody UserActivityDTO userActivityDTO) {
        if (userActivityDTO.getUserId() == null || userActivityDTO.getActivityConfigurationId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userActivityDTO);
        }
        UserActivityDTO result = adminService.createUserActivity(userActivityDTO);
        if (result == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/assignactivity/{id}")
    public ResponseEntity<?> updateUserActivity(@PathVariable Long id, @RequestBody UserActivityDTO userActivityDTO) {
        if (userActivityDTO.getUserId() == null || userActivityDTO.getActivityConfigurationId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userActivityDTO);
        }
        UserActivityDTO result = adminService.updateUserActivity(id, userActivityDTO);
        if (result == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/assignactivity/{id}")
    public ResponseEntity<Void> deleteAssignActivity(@PathVariable Long id) {
        adminService.deleteAssignActivity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/configurations")
    public ResponseEntity<List<ActivityConfigurationDTO>> getActivityConfigurationsByUserId(){
        return ResponseEntity.ok(adminService.getActivityConfigurationsByUserId());
    }

    @GetMapping("/assignactivities")
    public ResponseEntity<List<UserActivityDTO>> getUserActitityByUserId() {
        return ResponseEntity.ok(adminService.getUserActitityByUserId());
    }

    @GetMapping("/deployactivities")
    public ResponseEntity<List<DeployActivityDTO>> getDeployActivityByUserId() {
        return ResponseEntity.ok(adminService.getDeployActivityByUserId());
    }

    @GetMapping("/countdeployactivitiesbyuserid")
    public Long countDeployActivitiesByUserId() {
        return adminService.countDeployActivitiesByUserId();
    }

    @DeleteMapping("/deletedeployactivity/{id}")
    public ResponseEntity<Void> deleteDeployActivity(@PathVariable Long id) {
        adminService.deleteDeployActivity(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/deployactivities/{id}")
    public ResponseEntity<DeployActivityDTO> updateDeployActivity(
            @PathVariable Long id,
            @RequestParam("nota") double nota
    ){
        DeployActivityDTO deployActivityDTO = adminService.updateDeployActivity(id, nota);
        return new ResponseEntity<>(deployActivityDTO, HttpStatus.CREATED);
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotifications() {
        return ResponseEntity.ok(adminService.getUnreadNotifications());
    }

    @PutMapping("/notifications/{id}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        adminService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
