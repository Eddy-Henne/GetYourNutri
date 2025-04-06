package de.getyournutri.backend.Papierkorb;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PapierkorbRepository extends MongoRepository<PapierkorbNutri, String> {
}
