package com.devwn.taskmanagement.infra.security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JWToken {

    private final UserRepository userRepository;

    @Value("${api.security.token.secret}")
    private String SECRET;

    public String generateJWToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.create()
                    .withIssuer("task_management")
                    .withSubject(user.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException ex) {
            throw new RuntimeException("Error while generating token", ex);
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("+02:00"));
    }

    public String validateToken(String token) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.require(algorithm)
                    .withIssuer("task_management")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch(JWTVerificationException ex){
            return "";
        }
    }

    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            Optional<User> userOptional = userRepository.findById(user.getId());
            return userOptional.orElse(null);
        }
        return null;
    }

//    private Key getSigningKey(){
//        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//
//
//    public Claims extractAllClaims(String token){
//        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
//    }
//
//    public <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
//        final Claims claims = extractAllClaims(token);
//        return claimsTFunction.apply(claims);
//    }
//
//    public String extractUsername(String token){
//        return extractClaims(token, Claims::getSubject);
//    }
//
//    public Date extractExpiration(String token){
//        return extractClaims(token, Claims::getExpiration);
//    }
//
//    public boolean isTokenExpired(String token){
//        return extractExpiration(token).before(new Date());
//    }
//
//    public boolean isTokenValid(String token, UserDetails userDetails){
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//    private String generateToken(Map<String, Object> extractClaims, UserDetails userDetails){
//       return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
//                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
//    }
//
//    public String generateToken(UserDetails userDetails){
//        return generateToken(new HashMap<>(), userDetails);
//    }
}
