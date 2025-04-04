package com.ensias.spacex.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Long id;

    @Column
    String depart;

    @Column
    String arrive;

    @Column
    Date dateDepart;

    @Column
    Date dateArrivee;

    @Column
    Long prix;

    public Travel(String depart, String arrive, Date dateDepart, Date dateArrivee, Long prix) {
        this.depart = depart;
        this.arrive = arrive;
        this.dateDepart = dateDepart;
        this.dateArrivee = dateArrivee;
        this.prix = prix;
    }
}