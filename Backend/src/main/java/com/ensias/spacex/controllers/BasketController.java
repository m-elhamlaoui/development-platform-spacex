package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class BasketController {

    private final BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    // POST /api/v1/addToBasket
    @PostMapping("/addToBasket")
    public Map<String, Object> addToBasket(@RequestBody BasketRequestDto request) {
        basketService.addToBasket(request);
        //  renvoie un JSON vide ({}).
        return Collections.emptyMap();
    }

    // POST /api/v1/removeFromBasket
    @PostMapping("/removeFromBasket")
    public Map<String, Object> removeFromBasket(@RequestBody BasketRequestDto request) {
        basketService.removeFromBasket(request);

        return Collections.emptyMap();
    }
}
