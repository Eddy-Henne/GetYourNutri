package de.getyournutri.backend.UserRegAndLog;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "regusers")
public class RegUser {
    @MongoId
    private String id;
    private String username;
    private String password;
}
