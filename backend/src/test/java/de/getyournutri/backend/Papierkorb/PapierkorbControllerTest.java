package de.getyournutri.backend.Papierkorb;

import de.getyournutri.backend.NutriDatabase.NutriDatabase;
import de.getyournutri.backend.NutriDatabase.NutriDatabaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PapierkorbControllerTest {

    private PapierkorbRepository papierkorbRepository;
    private NutriDatabaseRepository nutriDatabaseRepository;
    private PapierkorbController controller;

    @BeforeEach
    void setUp() {
        papierkorbRepository = mock(PapierkorbRepository.class);
        nutriDatabaseRepository = mock(NutriDatabaseRepository.class);
        controller = new PapierkorbController(papierkorbRepository, nutriDatabaseRepository);
    }

    @Test
    void restoreNutri_shouldRestoreNutriDatabaseAndRemoveFromPapierkorb() {
        // GIVEN
        PapierkorbNutri papierNutri = new PapierkorbNutri(
                "123", "123456789", "Produkt", "Marke", "Supermarkt",
                "Kategorie", "ja", "100", "10", "5", "20", "10", "5"
        );
        when(papierkorbRepository.findById("123")).thenReturn(Optional.of(papierNutri));

        // WHEN
        NutriDatabase result = controller.restoreNutri("123");

        // THEN
        ArgumentCaptor<NutriDatabase> captor = ArgumentCaptor.forClass(NutriDatabase.class);
        verify(nutriDatabaseRepository).save(captor.capture());
        verify(papierkorbRepository).deleteById("123");

        NutriDatabase saved = captor.getValue();
        assertEquals("123", saved.getId());
        assertEquals("Produkt", saved.getName());
        assertEquals("ja", saved.getEssbar());
        assertEquals("100", saved.getEnergie());
    }

    @Test
    void restoreNutri_shouldThrowExceptionIfNotFound() {
        // GIVEN
        when(papierkorbRepository.findById("notfound")).thenReturn(Optional.empty());

        // THEN
        assertThrows(RuntimeException.class, () -> controller.restoreNutri("notfound"));
    }

    @Test
    void deleteFromPapierkorb_shouldCallRepositoryDeleteById() {
        // WHEN
        controller.deleteFromPapierkorb("456");

        // THEN
        verify(papierkorbRepository).deleteById("456");
    }

    @Test
    void clearPapierkorb_shouldDeleteAll() {
        // WHEN
        controller.clearPapierkorb();

        // THEN
        verify(papierkorbRepository).deleteAll();
    }
}