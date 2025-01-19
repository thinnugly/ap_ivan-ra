package com.devwn.taskmanagement.infra.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketUserRegistry {

    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    public void addUserSession(String userEmail, WebSocketSession session) {
        userSessions.put(userEmail, session);
    }

    public void removeUserSession(String userEmail) {
        userSessions.remove(userEmail);
    }

    public WebSocketSession getUserSession(String userEmail) {
        return userSessions.get(userEmail);
    }
}

