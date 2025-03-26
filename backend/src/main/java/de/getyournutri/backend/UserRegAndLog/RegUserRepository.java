package de.getyournutri.backend.UserRegAndLog;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegUserRepository extends MongoRepository<RegUser, String> {
    Optional<RegUser> findRegUserByUsername(String username);
    Optional<RegUser> findRegUserByEmail(String email);
}
