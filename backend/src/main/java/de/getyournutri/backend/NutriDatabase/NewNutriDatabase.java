package de.getyournutri.backend.NutriDatabase;

public record NewNutriDatabase(
        String barcode,
        String name,
        String marke,
        String supermarkt,
        String kategorie,
        String essbar,
        String energie,
        String fett,
        String fettsaeuren,
        String kohlenhydrate,
        String zucker,
        String eiweiss
) {
}
