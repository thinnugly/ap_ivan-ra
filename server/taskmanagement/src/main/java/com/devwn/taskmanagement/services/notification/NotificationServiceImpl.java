package com.devwn.taskmanagement.services.notification;

import com.devwn.taskmanagement.dto.NotificationDTO;
import com.devwn.taskmanagement.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {


    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void sendNotificationToUser(User user, String message) {
        String destination = String.format("/queue/notifications/%s", user.getEmail());

        NotificationDTO notification = new NotificationDTO();
        notification.setMessage(message);
        notification.setTimestamp(LocalDateTime.now());

        messagingTemplate.convertAndSend(destination, notification);
    }
}
