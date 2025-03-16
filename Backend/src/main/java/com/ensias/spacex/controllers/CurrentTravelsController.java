package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class CurrentTravelsController {

    private final TravelService service;

    @Autowired // for dependency injection
    public CurrentTravelsController(TravelService service){
        this.service = service;
    }

    @GetMapping(value = "/api/v1/currentTravels")
    public List<TravelDto> getCurrentTravels() {
        return this.service.getCurrentTravels();
    }


}
