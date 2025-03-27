package de.getyournutri.backend.UserRegAndLog;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class RegUserController {

    private final RegUserService regUserService;


    @GetMapping("/me")
    public RegUserResponse getLoggedInUser() {
       /* var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        RegUser regUser = regUserService.findByUsername(principal.getUsername());
        return new RegUserResponse(regUser.getId(), regUser.getUsername());

        */
        return regUserService.getLoggedInUser();
    }

    @PostMapping("/login")
    //public void login(){    }

    public ResponseEntity<String> login(){
        return ResponseEntity.ok("Login erfolgreich");
    }



    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegUserResponse register(@RequestBody RegUserRegister regUserRegister) {
        return regUserService.register(regUserRegister);
    }
}
