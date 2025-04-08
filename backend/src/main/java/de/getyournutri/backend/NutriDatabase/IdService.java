package de.getyournutri.backend.NutriDatabase;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String randomId() {
        return UUID.randomUUID().toString();
    }
}
