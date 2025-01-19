package com.devwn.taskmanagement.infra.schedule;

import com.devwn.taskmanagement.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserActivityScheduler {

    private final AdminService adminService;

    @Scheduled(cron = "*/20 * * * * *")
    public void cancelLateActivities() {
        adminService.cancelLateActivities();
    }
}
