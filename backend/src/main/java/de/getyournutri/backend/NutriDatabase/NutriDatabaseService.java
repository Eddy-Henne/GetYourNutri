package de.getyournutri.backend.NutriDatabase;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import de.getyournutri.backend.Papierkorb.PapierkorbNutri;
import de.getyournutri.backend.Papierkorb.PapierkorbRepository;


@Service
public class NutriDatabaseService {

    private final NutriDatabaseRepository nutriDatabaseRepository;
    private final IdService idService;
    private final PapierkorbRepository papierkorbRepository;

    public NutriDatabaseService(NutriDatabaseRepository nutriDatabaseRepository, IdService idService, PapierkorbRepository papierkorbRepository) {
        this.nutriDatabaseRepository = nutriDatabaseRepository;
        this.idService = idService;
        this.papierkorbRepository = papierkorbRepository;
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
        return nutriDatabaseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Nutri mit  " + id + " nicht gefunden"));
    }

    public void deleteNutriDatabase(String id) {
        NutriDatabase nutriToDelete = nutriDatabaseRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Nutri mit id " + id + " nicht gefunden"));

        PapierkorbNutri papierkorbNutri = new PapierkorbNutri(
                nutriToDelete.getId(),
                nutriToDelete.getBarcode(),
                nutriToDelete.getName(),
                nutriToDelete.getMarke(),
                nutriToDelete.getSupermarkt(),
                nutriToDelete.getKategorie(),
                nutriToDelete.getEssbar(),
                nutriToDelete.getEnergie(),
                nutriToDelete.getFett(),
                nutriToDelete.getFettsaeuren(),
                nutriToDelete.getKohlenhydrate(),
                nutriToDelete.getZucker(),
                nutriToDelete.getEiweiss()
        );
        papierkorbRepository.save(papierkorbNutri);

        List<PapierkorbNutri> papierkorbInhalte = papierkorbRepository.findAll();
        if (papierkorbInhalte.size() > 10) {
            PapierkorbNutri oldest = papierkorbInhalte.getFirst();
            papierkorbRepository.deleteById(oldest.getId());
        }
        nutriDatabaseRepository.deleteById(id);
    }
}
