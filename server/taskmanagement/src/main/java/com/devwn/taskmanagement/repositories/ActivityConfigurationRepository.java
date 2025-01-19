package com.devwn.taskmanagement.repositories;

import com.devwn.taskmanagement.entities.ActivityConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityConfigurationRepository extends JpaRepository<ActivityConfiguration, Long> {

    List<ActivityConfiguration> findAllByUserId(Long userId);
    long countAllByUserId(Long userId);
}
