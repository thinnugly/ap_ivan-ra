package com.devwn.taskmanagement.services.notification;

import com.devwn.taskmanagement.entities.User;

public interface NotificationService {

   void sendNotificationToUser(User user, String message);
}
