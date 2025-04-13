package de.getyournutri.backend.Papierkorb;

import de.getyournutri.backend.NutriDatabase.NutriDatabase;
import de.getyournutri.backend.NutriDatabase.NutriDatabaseRepository;
import de.getyournutri.backend.NutriDatabase.NutriDatabaseService;
import de.getyournutri.backend.NutriDatabase.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PapierkorbServiceTest {

    private NutriDatabaseRepository nutriDatabaseRepository;
    private IdService idService;
    private PapierkorbRepository papierkorbRepository;
    private NutriDatabaseService service;

    @BeforeEach
    void setUp() {
        nutriDatabaseRepository = mock(NutriDatabaseRepository.class);
        idService = mock(IdService.class);
        papierkorbRepository = mock(PapierkorbRepository.class);
        service = new NutriDatabaseService(nutriDatabaseRepository, idService, papierkorbRepository);
    }

    @Test
    void deleteNutriDatabase_shouldMoveToPapierkorbAndDeleteFromNutriDatabase() {
        // GIVEN
        NutriDatabase nutri = new NutriDatabase(
                "1", "123456789", "Name", "Marke", "Supermarkt",
                "Kategorie", "ja", "100", "10", "5", "20", "8", "6"
        );
        when(nutriDatabaseRepository.findById("1")).thenReturn(Optional.of(nutri));
        when(papierkorbRepository.findAll()).thenReturn(List.of()); // Papierkorb ist leer

        // WHEN
        service.deleteNutriDatabase("1");

        // THEN
        ArgumentCaptor<PapierkorbNutri> papierCaptor = ArgumentCaptor.forClass(PapierkorbNutri.class);
        verify(papierkorbRepository).save(papierCaptor.capture());
        verify(nutriDatabaseRepository).deleteById("1");

        PapierkorbNutri papierNutri = papierCaptor.getValue();
        assertEquals("1", papierNutri.getId());
        assertEquals("Name", papierNutri.getName());
    }

    @Test
    void deleteNutriDatabase_shouldRemoveOldestIfPapierkorbHasMoreThan10Items() {
        // GIVEN
        NutriDatabase nutri = new NutriDatabase(
                "2", "987654321", "Alt", "Test", "Laden",
                "Snacks", "nein", "200", "12", "3", "30", "15", "2"
        );
        when(nutriDatabaseRepository.findById("2")).thenReturn(Optional.of(nutri));

        List<PapierkorbNutri> papierkorbInhalte = mock(List.class);
        when(papierkorbInhalte.size()).thenReturn(11);
        PapierkorbNutri ältestes = new PapierkorbNutri("oldest", "000", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...");
        when(papierkorbInhalte.getFirst()).thenReturn(ältestes);

        when(papierkorbRepository.findAll()).thenReturn(papierkorbInhalte);

        // WHEN
        service.deleteNutriDatabase("2");

        // THEN
        verify(papierkorbRepository).deleteById("oldest");
        verify(papierkorbRepository).save(any(PapierkorbNutri.class));
        verify(nutriDatabaseRepository).deleteById("2");
    }

    @Test
    void deleteNutriDatabase_shouldThrowIfIdNotFound() {
        // GIVEN
        when(nutriDatabaseRepository.findById("not_found")).thenReturn(Optional.empty());

        // THEN
        assertThrows(NoSuchElementException.class, () -> service.deleteNutriDatabase("not_found"));
    }
}