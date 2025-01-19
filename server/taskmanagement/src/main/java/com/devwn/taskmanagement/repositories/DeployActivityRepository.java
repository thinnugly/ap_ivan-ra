package com.devwn.taskmanagement.repositories;

import com.devwn.taskmanagement.entities.DeployActivity;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.entities.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeployActivityRepository extends JpaRepository<DeployActivity, Long> {

    List<DeployActivity> findAllByUserId(Long userId);
    List<DeployActivity> findByOperationUser(String operationUser);
    long countAllByUserId(Long userId);
    long countByOperationUser(String operationUser);
}
