package de.getyournutri.backend.UserRegAndLog;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegUserDetailsService implements UserDetailsService {

    private final RegUserService regUserService;

    //Einen Benutzer anhand des Benutzernamens finden, laden und auf authentifiziert setzen
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        RegUser regUser = regUserService.findByUsername(username);
        return new User(
                regUser.getUsername(),
                regUser.getPassword(),
                List.of());
    }
}
