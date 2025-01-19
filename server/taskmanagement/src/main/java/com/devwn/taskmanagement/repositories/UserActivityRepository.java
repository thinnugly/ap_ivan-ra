package com.devwn.taskmanagement.repositories;

import com.devwn.taskmanagement.dto.UserActivityDTO;
import com.devwn.taskmanagement.entities.ActivityConfiguration;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.entities.UserActivity;
import com.devwn.taskmanagement.enums.ActivityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    List<UserActivity> findByOperationUser(User operationUser);
    List<UserActivity> findAllByUserId(Long userId);
    long countAllByUserId(Long userId);
    List<UserActivity> findByActivityStatusAndDueDateBefore(ActivityStatus activityStatus, Date dueDate);

}

