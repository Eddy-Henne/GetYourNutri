package de.getyournutri.backend.UserRegAndLog;


import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegUserService {

    private final RegUserRepository regUserRepository;
    private final PasswordEncoder passwordEncoder;

    public RegUser findByUsername(String username) {
        return regUserRepository
                .findRegUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Benutzer nicht gefunden"));
    }

    public RegUserResponse getLoggedInUser(){
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        RegUser regUser = findByUsername(principal.getUsername());
        return new RegUserResponse(regUser.getId(), regUser.getUsername());
    }
    public RegUserResponse register(RegUserRegister regUserRegister) {
        RegUser regUser = new RegUser();
        regUser.setUsername(regUserRegister.username());
        regUser.setPassword(passwordEncoder.encode(regUserRegister.password()));
        regUser = regUserRepository.save(regUser);
        return new RegUserResponse(regUser.getId(), regUser.getUsername());
    }
}
