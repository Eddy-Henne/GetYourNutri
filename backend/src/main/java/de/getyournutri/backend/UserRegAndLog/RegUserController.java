package de.getyournutri.backend.UserRegAndLog;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class RegUserController {
    private final RegUserService regUserService;


    @GetMapping("/me")
    public RegUserResponse getLoggedInUser() {
        return regUserService.getLoggedInUser();
    }

    @PostMapping("/login")
    public void login(){
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegUserResponse register(@RequestBody RegUserRegister regUserRegister) {
        return regUserService.register(regUserRegister);
    }
}
