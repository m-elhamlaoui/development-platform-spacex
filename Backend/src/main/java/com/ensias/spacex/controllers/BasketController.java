package com.ensias.spacex.controllers;

import com.ensias.spacex.DTO.BasketRequestDto;
import com.ensias.spacex.DTO.TravelDto;
import com.ensias.spacex.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BasketController {

    private final BasketService basketService;

    @Autowired
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @PostMapping("/addToBasket")
    public List<TravelDto> addToBasket(@RequestBody List<BasketRequestDto> basketRequests) {

        return basketService.addToBasket(basketRequests);
    }

    @PostMapping("/removeFromBasket")
    public List<TravelDto> removeFromBasket(@RequestBody List<BasketRequestDto> basketRequests) {

        return basketService.removeFromBasket(basketRequests);
    }
}
