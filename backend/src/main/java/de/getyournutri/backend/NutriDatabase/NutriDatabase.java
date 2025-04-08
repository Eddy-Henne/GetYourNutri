package de.getyournutri.backend.NutriDatabase;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "nutris")
public class NutriDatabase {
    //@MongoId
    private String id;
    private String barcode;
    private String name;

    private String marke;
    private String supermarkt;
    private String kategorie;
    private String essbar;

    private String energie;
    private String fett;
    private String fettsaeuren;
    private String kohlenhydrate;
    private String zucker;
    private String eiweiss;
}
