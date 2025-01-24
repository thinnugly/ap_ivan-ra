package com.devwn.taskmanagement.repositories;

import com.devwn.taskmanagement.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdAndReadFalse(Long userId);
    void deleteByReadTrue();

}
