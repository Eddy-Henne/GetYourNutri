package de.getyournutri.backend.NutriDatabase;

import de.getyournutri.backend.Papierkorb.PapierkorbRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NutriDatabaseServiceTest {

    NutriDatabaseRepository nutriDatabaseRepository =  mock(NutriDatabaseRepository.class);
    IdService idService = mock(IdService.class);
    PapierkorbRepository papierkorbRepository = mock(PapierkorbRepository.class);

    NutriDatabaseService nutriDatabaseService = new NutriDatabaseService(
            nutriDatabaseRepository,
            idService,
            papierkorbRepository);

    // 🔧 Hilfsmethode zum Erstellen eines Dummy-NutriDatabase-Objekts
    private NutriDatabase createTestNutriDatabase(String id, String barcode, String name) {
        return new NutriDatabase(id, barcode, name,
                "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");
    }

    private NewNutriDatabase createTestNewNutriDatabase(String barcode, String name) {
        return new NewNutriDatabase(barcode, name,
                "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");
    }

    private ChangeNutriDatabase createTestChangeNutriDatabase(String barcode, String name) {
        return new ChangeNutriDatabase(barcode, name,
                "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");
    }

    @Test
    void findAllNutris() {
        //GIVEN
        NutriDatabase t1 = createTestNutriDatabase("1", "123456789", "Nutri1");
        NutriDatabase t2 = createTestNutriDatabase("2", "987654321", "Nutri2");
        NutriDatabase t3 = createTestNutriDatabase("3", "123456789", "Nutri3");
        List<NutriDatabase> nutriDatabases = List.of(t1, t2, t3);

        when(nutriDatabaseRepository.findAll()).thenReturn(nutriDatabases);

        //WHEN
        List<NutriDatabase> actual = nutriDatabaseService.findAllNutris();

        //THEN
        verify(nutriDatabaseRepository).findAll();
        assertEquals(nutriDatabases, actual);
    }

    @Test
    void addNutriDatabase() {
        //GIVEN
        NewNutriDatabase newNutriDatabase = createTestNewNutriDatabase("123456789", "Nutri1");
        NutriDatabase nutriDatabaseToSave = createTestNutriDatabase("Test1", "123456789", "Nutri1");

        when(idService.randomId()).thenReturn("Test1");
        when(nutriDatabaseRepository.save(nutriDatabaseToSave))
                .thenReturn(nutriDatabaseToSave);

        //WHEN
        NutriDatabase actual = nutriDatabaseService.addNutriDatabase(newNutriDatabase);

        //THEN
        verify(idService).randomId();
        verify(nutriDatabaseRepository).save(nutriDatabaseToSave);
        assertEquals(nutriDatabaseToSave, actual);
    }

    @Test
    void changeNutriDatabase() {
        //GIVEN
        String id = "123";
        ChangeNutriDatabase nutriDatabaseToChange = createTestChangeNutriDatabase("1234567889", "Nutrii1");
        NutriDatabase changedNutriDatabase = createTestNutriDatabase("123", "1234567889", "Nutrii1");

        when(nutriDatabaseRepository.save(changedNutriDatabase))
                .thenReturn(changedNutriDatabase);

        //WHEN

        NutriDatabase actual = nutriDatabaseService.changeNutriDatabase(nutriDatabaseToChange, id);

        //THEN
        verify(nutriDatabaseRepository).save(changedNutriDatabase);
        assertEquals(changedNutriDatabase, actual);
    }

    @Test
    void getNutriDatabaseByIdTest_whenValidId_ThenReturnNutriDatabase() {
        //GIVEN
        String id = "1";
        NutriDatabase nutriDatabase = createTestNutriDatabase("1", "123456789", "Nutri1");

        when(nutriDatabaseRepository.findById(id))
                .thenReturn(Optional.of(nutriDatabase));

        //WHEN
        NutriDatabase actual = nutriDatabaseService.findNutriDatabaseById(id);

        //THEN
        verify(nutriDatabaseRepository).findById(id);
        assertEquals(nutriDatabase, actual);
    }

    @Test
    void getNutriDatabaseByIdTest_whenInValidId_ThenThrowException() {
        //GIVEN
        String id = "1";

        when(nutriDatabaseRepository.findById(id))
                .thenReturn(Optional.empty());

        //WHEN
        assertThrows(NoSuchElementException.class, () -> nutriDatabaseService.findNutriDatabaseById(id));

        //THEN
        verify(nutriDatabaseRepository).findById(id);
    }

    @Test
    void deleteNutriDatabaseByIdTest_whenValidId_ThenReturnNutriDatabase() {
        //GIVEN
        String id = "1";
        doNothing().when(nutriDatabaseRepository).deleteById(id);

        //WHEN
        nutriDatabaseService.deleteNutriDatabase(id);

        //THEN
        verify(nutriDatabaseRepository).deleteById(id);
    }
}



