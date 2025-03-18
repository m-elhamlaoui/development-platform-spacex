package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.SearchRequestDto;
import com.ensias.spacex.model.Travel;
import com.ensias.spacex.service.TravelService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchTravelsController {

    private final TravelService service;

    public SearchTravelsController(TravelService service) {
        this.service = service;
    }
    @PostMapping(value = "/api/v1/searchTravel")
    public List<Travel> searchForTravels(@RequestBody SearchRequestDto searchRequestDto){ return this.service.searchForTravels(searchRequestDto);}
}
