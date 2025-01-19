package com.devwn.taskmanagement.controllers.student;

import com.devwn.taskmanagement.dto.DeployActivityDTO;
import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.services.student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/countactivitiesconfigurations")
    public long countActivitiesConfigurations() {
        return studentService.countActivitiesConfigurations();
    }

    @GetMapping("/assignactivities")
    public ResponseEntity<List<UserActivityDTO>> getUserActitityByUserId() {
        return ResponseEntity.ok(studentService.getUserActitityByUserId());
    }

    @PostMapping("/deployactivities")
    public ResponseEntity<DeployActivityDTO> createDeployActivity(
            @RequestParam("userActivityId") Long userActivityId,
            @RequestParam("userId") Long userId,
            @RequestParam("activityDeployed") MultipartFile activityDeployed
    ){
        DeployActivityDTO deployActivityDTO = studentService.createDeployActivity(userActivityId, userId, activityDeployed);
        return new ResponseEntity<>(deployActivityDTO, HttpStatus.CREATED);
    }

    @GetMapping("/deployactivities")
    public ResponseEntity<List<DeployActivityDTO>> getDeployActivityByUserId() {
        return ResponseEntity.ok(studentService.getDeployActivityByUserId());
    }

    @GetMapping("/countdeployactivitiesbyuserid")
    public Long countDeployActivitiesByUserId() {
        return studentService.countDeployActivitiesByUserId();
    }

    @PutMapping("/deployactivities/{id}")
    public ResponseEntity<DeployActivityDTO> updateDeployActivity(
            @PathVariable Long id,
            @RequestParam("activityDeployed") MultipartFile activityDeployed
    ){
        DeployActivityDTO deployActivityDTO = studentService.updateDeployActivity(id, activityDeployed);
        return new ResponseEntity<>(deployActivityDTO, HttpStatus.CREATED);
    }
}
