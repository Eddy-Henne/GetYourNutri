package de.getyournutri.backend.NutriDatabase;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutriDatabaseRepository extends MongoRepository<NutriDatabase, String> {
}
