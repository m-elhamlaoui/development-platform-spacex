package com.ensias.spacex.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TravelDto {
    private String depart;
    private String arrive;
    private Date dateDepart;
    private Date dateArrive;
    private int percentage;
}
