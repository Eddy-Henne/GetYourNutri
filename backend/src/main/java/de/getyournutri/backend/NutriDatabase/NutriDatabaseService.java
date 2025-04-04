package de.getyournutri.backend.NutriDatabase;


import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class NutriDatabaseService {

    private final NutriDatabaseRepository nutriDatabaseRepository;
    private final IdService idService;

    public NutriDatabaseService(NutriDatabaseRepository nutriDatabaseRepository, IdService idService) {
        this.nutriDatabaseRepository = nutriDatabaseRepository;
        this.idService = idService;
    }

    public List<NutriDatabase> findAllNutris() {
        return nutriDatabaseRepository.findAll();
    }

    public NutriDatabase addNutriDatabase(NewNutriDatabase newNutriDatabase) {
        String id = idService.randomId();

        NutriDatabase nutriDatabaseToSave = new NutriDatabase(id, newNutriDatabase.barcode(), newNutriDatabase.name(), newNutriDatabase.marke(), newNutriDatabase.supermarkt(), newNutriDatabase.kategorie(), newNutriDatabase.essbar(), newNutriDatabase.energie(), newNutriDatabase.fett(), newNutriDatabase.fettsaeuren(), newNutriDatabase.kohlenhydrate(), newNutriDatabase.zucker(), newNutriDatabase.eiweiss());
        return nutriDatabaseRepository.save(nutriDatabaseToSave);
    }

    public NutriDatabase changeNutriDatabase(ChangeNutriDatabase nutriDatabase, String id) {
        NutriDatabase nutriDatabaseToChange = new NutriDatabase(id, nutriDatabase.barcode(), nutriDatabase.name(), nutriDatabase.marke(), nutriDatabase.supermarkt(), nutriDatabase.kategorie(), nutriDatabase.essbar(), nutriDatabase.energie(), nutriDatabase.fett(), nutriDatabase.fettsaeuren(), nutriDatabase.kohlenhydrate(), nutriDatabase.zucker(), nutriDatabase.eiweiss());
        return nutriDatabaseRepository.save(nutriDatabaseToChange);
    }

    public NutriDatabase findNutriDatabaseById(String id) {
        return nutriDatabaseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Nutri with id " + id + " not found"));
    }

    public void deleteNutriDatabase(String id) {
        nutriDatabaseRepository.deleteById(id);
    }
}
