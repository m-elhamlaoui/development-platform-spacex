package com.ensias.spacex.controllers;

import com.ensias.spacex.model.Travel;
import com.ensias.spacex.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExploreTravelsController {

    private final TravelService travelService;

    @Autowired
    public ExploreTravelsController(TravelService travelService) {
        this.travelService = travelService;
    }
    @GetMapping("/api/v1/exploreTravels")
    public List<Travel> exploreTravels() {
        return  travelService.getExploredTravels();
    }
}
