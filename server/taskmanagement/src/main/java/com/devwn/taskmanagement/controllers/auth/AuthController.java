package com.devwn.taskmanagement.controllers.auth;


import com.devwn.taskmanagement.dto.SigninRequest;
import com.devwn.taskmanagement.dto.SigninResponse;
import com.devwn.taskmanagement.dto.SignupRequest;
import com.devwn.taskmanagement.dto.UserDTO;
import com.devwn.taskmanagement.entities.User;
import com.devwn.taskmanagement.enums.UserRole;
import com.devwn.taskmanagement.infra.security.JWToken;
import com.devwn.taskmanagement.services.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;

    
    private final AuthenticationManager authenticationManager;

    private final JWToken jwToken;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest){
        if(authService.hasUserWithEmail(signupRequest.getEmail())){
            return  ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exists.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not authenticated.");
        }

        UserRole roleToAssign = UserRole.EMPLOYEE;
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(UserRole.ADMIN.name()));

        if (isAdmin && signupRequest.getUserRole() != null) {
            roleToAssign = signupRequest.getUserRole();
        }

        UserDTO userDTO = authService.signup(signupRequest, roleToAssign);
        if(userDTO == null){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signinRequest.getEmail(),
                            signinRequest.getPassword())
            );

            final String generateToken = jwToken.generateJWToken((User) auth.getPrincipal());

            SigninResponse signinResponse = new SigninResponse();
            signinResponse.setToken(generateToken);
            signinResponse.setUserId(((User) auth.getPrincipal()).getId());
            signinResponse.setUsername(((User) auth.getPrincipal()).getEmail());
            signinResponse.setUserRole(((User) auth.getPrincipal()).getUserRole());
            signinResponse.setEmail(((User) auth.getPrincipal()).getUsername());


            return ResponseEntity.status(HttpStatus.OK).body(signinResponse);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during authentication.");
        }
    }

//    @GetMapping("/users")
//    public ResponseEntity<?> getAllUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !authentication.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not authenticated.");
//        }
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//
//        StringBuilder roles = new StringBuilder();
//        for (GrantedAuthority authority : authorities) {
//            roles.append(authority.getAuthority()).append(" ");
//        }
//
//        boolean isAdmin = authentication.getAuthorities().stream()
//                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(UserRole.ADMIN.name()));
//
//        if (isAdmin) {
//            return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
//        } else {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                    .body("Access denied: Only admins can perform this action.");
//        }
//    }
}
