package de.getyournutri.backend.Papierkorb;

import de.getyournutri.backend.NutriDatabase.NutriDatabase;
import de.getyournutri.backend.NutriDatabase.NutriDatabaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/papierkorb")
public class PapierkorbController {

    private final PapierkorbRepository papierkorbRepository;
    private final NutriDatabaseRepository nutriDatabaseRepository;

    public PapierkorbController(PapierkorbRepository papierkorbRepository, NutriDatabaseRepository nutriDatabaseRepository) {
        this.papierkorbRepository = papierkorbRepository;
        this.nutriDatabaseRepository = nutriDatabaseRepository;
    }

    @GetMapping
    public List<PapierkorbNutri> getAllPapierkorbNutris() {
        return papierkorbRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteFromPapierkorb(@PathVariable String id) {
        papierkorbRepository.deleteById(id);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearPapierkorb() {
        papierkorbRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/restore/{id}")
    public NutriDatabase restoreNutri(@PathVariable String id) {
        PapierkorbNutri toRestore = papierkorbRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Papierkorb-Objekt mit ID " + id + " nicht gefunden"));

        NutriDatabase restored = new NutriDatabase(
                toRestore.getId(),
                toRestore.getBarcode(),
                toRestore.getName(),
                toRestore.getMarke(),
                toRestore.getSupermarkt(),
                toRestore.getKategorie(),
                toRestore.getEssbar(),
                toRestore.getEnergie(),
                toRestore.getFett(),
                toRestore.getFettsaeuren(),
                toRestore.getKohlenhydrate(),
                toRestore.getZucker(),
                toRestore.getEiweiss()
        );

        nutriDatabaseRepository.save(restored);
        papierkorbRepository.deleteById(id);

        return restored;
    }
}
