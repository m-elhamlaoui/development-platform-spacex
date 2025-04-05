package com.ensias.spacex.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BasketRequestAddDelDto {
    private String basketId;
    private Long travelId;
}
