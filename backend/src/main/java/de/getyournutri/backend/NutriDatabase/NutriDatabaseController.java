package de.getyournutri.backend.NutriDatabase;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/nutri")
public class NutriDatabaseController {

    private final NutriDatabaseService nutriDatabaseService;

    NutriDatabaseController(NutriDatabaseService nutriDatabaseService) {
        this.nutriDatabaseService = nutriDatabaseService;
    }

    @GetMapping
    public List<NutriDatabase> getAllNutris() {
        return nutriDatabaseService.findAllNutris();
    }

    @GetMapping("/{id}")
    public NutriDatabase getNutriDatabaseById(@PathVariable String id) {
        return nutriDatabaseService.findNutriDatabaseById(id);
    }

    @PostMapping
    public NutriDatabase postNutriDatabase(@RequestBody NewNutriDatabase newNutriDatabase) {
        return nutriDatabaseService.addNutriDatabase(newNutriDatabase);
    }

    @PutMapping("/{id}")
    public NutriDatabase putNutriDatabase(@PathVariable String id, @RequestBody ChangeNutriDatabase nutriDatabase) {
        return nutriDatabaseService.changeNutriDatabase(nutriDatabase, id);
    }

    @DeleteMapping("/{id}")
    public void deleteNutriDatabase(@PathVariable String id) {
        nutriDatabaseService.deleteNutriDatabase(id);
    }
}
