package de.getyournutri.backend.UserRegAndLog;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class RegUserController {
    private final RegUserService regUserService;


    @GetMapping("/me")
    public RegUserResponse getLoggedInUser(HttpServletRequest request) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        RegUser user = regUserService.findByUsername(principal.getUsername());
        return new RegUserResponse(user.getId(), user.getUsername());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Benutzername oder Passwort falsch");
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();

//  Session-Cookie löschen
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegUserResponse register(@RequestBody RegUserRegister regUserRegister) {
        return regUserService.register(regUserRegister);
    }
}
