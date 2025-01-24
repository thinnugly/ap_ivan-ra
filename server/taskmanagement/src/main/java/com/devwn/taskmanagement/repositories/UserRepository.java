package com.devwn.taskmanagement.repositories;


import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);
    Optional<User> findByUserRole(UserRole userRole);
    Optional<User> findByEmail(String username);
    @Query("SELECT ua.user.id FROM UserActivity ua WHERE ua.id = :userActivityId")
    Long findUserIdByUserActivityId(@Param("userActivityId") Long userActivityId);
}
