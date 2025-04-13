package de.getyournutri.backend.NutriDatabase;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class NutriDatabaseControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    NutriDatabaseRepository nutriDatabaseRepository;

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser")
    void getAllNutris() throws Exception {
        // GIVEN
        NutriDatabase nutri = new NutriDatabase("1", "123456789", "Nutri1",
                null, null, null, null,
                null, null, null, null, null, null);
        nutriDatabaseRepository.save(nutri);

        // WHEN & THEN
        mockMvc.perform(get("/api/nutri"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].barcode").value("123456789"))
                .andExpect(jsonPath("$[0].name").value("Nutri1"));
    }

    @Test
    @DirtiesContext
    void postNutriDatabase() throws Exception {
        // WHEN & THEN
        mockMvc.perform(post("/api/nutri")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"barcode\":\"123456789\",\"name\":\"Nutri1\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.barcode").value("123456789"))
                .andExpect(jsonPath("$.name").value("Nutri1"))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "testuser")
    void putNutriDatabase() throws Exception {
        // GIVEN
        NutriDatabase existingNutri = new NutriDatabase("1", "123456789", "Nutri1",
                null, null, null, null,
                null, null, null, null, null, null);
        nutriDatabaseRepository.save(existingNutri);

        // WHEN & THEN
        mockMvc.perform(put("/api/nutri/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"barcode\":\"987654321\",\"name\":\"UpdatedNutri\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.barcode").value("987654321"))
                .andExpect(jsonPath("$.name").value("UpdatedNutri"));
    }

    @Test
    @DirtiesContext
    void getById() throws Exception {
        // GIVEN
        NutriDatabase nutri = new NutriDatabase("1", "123456789", "Nutri1",
                null, null, null, null,
                null, null, null, null, null, null);
        nutriDatabaseRepository.save(nutri);

        // WHEN & THEN
        mockMvc.perform(get("/api/nutri/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.barcode").value("123456789"))
                .andExpect(jsonPath("$.name").value("Nutri1"));
    }

    @Test
    @DirtiesContext
    void getByIdTest_whenInvalidId_thenStatus404() throws Exception {
        // WHEN & THEN
        mockMvc.perform(get("/api/nutri/invalid-id"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void deleteNutriDatabaseById() throws Exception {
        // GIVEN
        NutriDatabase nutri = new NutriDatabase("1", "123456789", "Nutri1",
                null, null, null, null,
                null, null, null, null, null, null);
        nutriDatabaseRepository.save(nutri);

        // WHEN & THEN
        mockMvc.perform(delete("/api/nutri/1"))
                .andExpect(status().isOk());
    }
}

